import { NextRequest, NextResponse } from 'next/server'
import { analyzeReceiptText } from '@/lib/gemini'

export const dynamic = 'force-dynamic'

// POST /api/receipt/scan
// Body: JSON { imageBase64: string, fileName: string }
// Accepts base64 image, sends to Gemini Vision for OCR + carbon analysis
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { imageBase64, fileName, rawText } = body

    // If raw text provided (from client-side extraction), use directly
    if (rawText && typeof rawText === 'string' && rawText.trim().length > 10) {
      const result = await analyzeReceiptText(rawText)
      return NextResponse.json({ success: true, result, source: 'text' })
    }

    // Use Gemini Vision to read the image directly
    if (!imageBase64) {
      return NextResponse.json({ error: 'No image or text provided' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey || apiKey === 'your-gemini-api-key') {
      // Demo fallback when no API key
      return NextResponse.json({
        success: true,
        source: 'demo',
        result: {
          type: 'electricity',
          amount: 2840,
          co2Impact: 142,
          energyUsed: 340,
          summary: 'Electricity bill — demo mode (add GEMINI_API_KEY for real analysis)',
          insights: [
            'This is a demo result. Add your GEMINI_API_KEY to get real AI-powered receipt analysis.',
            '340 kWh electricity usage generates ~142kg CO₂ on the Indian grid.',
          ],
        },
      })
    }

    // Determine image MIME type from base64 header or filename
    let mimeType = 'image/jpeg'
    if (imageBase64.startsWith('data:')) {
      mimeType = imageBase64.split(';')[0].replace('data:', '')
    } else if (fileName?.endsWith('.png')) {
      mimeType = 'image/png'
    } else if (fileName?.endsWith('.pdf')) {
      mimeType = 'application/pdf'
    }

    // Strip data URL prefix if present
    const base64Data = imageBase64.includes(',')
      ? imageBase64.split(',')[1]
      : imageBase64

    // Call Gemini Vision (gemini-1.5-flash supports images)
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data,
                  },
                },
                {
                  text: `You are analyzing a receipt, bill, or ticket to estimate its carbon footprint.

Extract all readable text from this image, then respond with ONLY valid JSON (no markdown):
{
  "type": "electricity|shopping|transport|food|unknown",
  "amount": <total amount in INR as number, 0 if unclear>,
  "co2Impact": <estimated kg CO2 as number>,
  "energyUsed": <kWh as number for electricity bills, null otherwise>,
  "summary": "<one sentence: what is this receipt for?>",
  "extractedText": "<all text you could read from the image>",
  "insights": ["<sustainability insight 1>", "<sustainability insight 2>"]
}

Carbon estimation guidelines:
- Electricity: use 0.82 kg CO2 per kWh (India grid average). If kWh not visible, estimate from amount (₹8/kWh approx).
- Petrol/fuel: use 2.31 kg CO2 per litre
- Flight ticket: short haul ~255kg, long haul ~900kg CO2 per person
- Shopping (clothes): ~5kg CO2 per item on average
- Food delivery: ~2kg CO2 per order
- Restaurant meal with meat: ~4kg CO2, vegetarian ~1.5kg CO2`,
                },
              ],
            },
          ],
          generationConfig: { temperature: 0.1, maxOutputTokens: 600 },
        }),
      }
    )

    if (!geminiRes.ok) {
      const errText = await geminiRes.text()
      console.error('[Receipt] Gemini Vision error:', geminiRes.status, errText)
      return NextResponse.json({ error: 'AI analysis failed', details: errText }, { status: 500 })
    }

    const geminiData = await geminiRes.json()
    const rawReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

    // Parse JSON from Gemini response
    let result
    try {
      const clean = rawReply.replace(/```json|```/g, '').trim()
      result = JSON.parse(clean)
    } catch {
      // If JSON parse fails, fall back to text analysis
      result = await analyzeReceiptText(rawReply)
    }

    return NextResponse.json({ success: true, result, source: 'gemini-vision' })
  } catch (err) {
    console.error('[Receipt] Scan error:', err)
    return NextResponse.json({ error: 'Failed to analyze receipt' }, { status: 500 })
  }
}
