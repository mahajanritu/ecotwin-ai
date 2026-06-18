import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT = `You are EcoCoach, an AI sustainability coach inside EcoTwin AI.
Be friendly, specific, and practical. Keep responses to 3-4 sentences max.
Always answer the EXACT question asked. Include specific numbers where helpful.
Do NOT give generic advice — directly address what the user asked.`

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    // ── DEBUG: log key status (remove in production) ──
    console.log('[Coach] API key present:', !!apiKey)
    console.log('[Coach] API key starts with AIza:', apiKey?.startsWith('AIza'))
    console.log('[Coach] User message:', message)

    // ── NO VALID KEY → clear error ──
    if (!apiKey || !apiKey.startsWith('AIza')) {
      return NextResponse.json({
        reply: `⚠️ Gemini API key not configured. Please add a valid GEMINI_API_KEY (starting with "AIzaSy") to your .env.local file. Get a free key at: https://aistudio.google.com/app/apikey`,
        source: 'no-key',
      })
    }

    // ── CALL GEMINI ──
    const body = {
      contents: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood! I am EcoCoach. I will answer every question directly and specifically about sustainability.' }],
        },
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
        topK: 40,
        topP: 0.95,
      },
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )

    const data = await res.json()

    // ── LOG FULL RESPONSE FOR DEBUGGING ──
    console.log('[Coach] Gemini status:', res.status)
    console.log('[Coach] Gemini response:', JSON.stringify(data).substring(0, 500))

    // ── API ERROR ──
    if (!res.ok || data.error) {
      const code = data.error?.code ?? res.status
      const msg = data.error?.message ?? 'Unknown error'
      console.error('[Coach] Gemini API error:', code, msg)

      let userMsg = `Gemini error (${code}): ${msg}`
      if (code === 400) userMsg = '❌ Invalid API key. Get a free key at aistudio.google.com/app/apikey — it should start with "AIzaSy".'
      if (code === 403) userMsg = '❌ API key rejected. Make sure "Generative Language API" is enabled in your Google Cloud project.'
      if (code === 429) userMsg = '⏳ Too many requests. Wait 30 seconds and try again.'

      return NextResponse.json({ reply: userMsg, source: 'api-error' })
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

    if (!reply) {
      console.warn('[Coach] Empty reply from Gemini')
      return NextResponse.json({ reply: 'Sorry, I got an empty response. Please try again.', source: 'empty' })
    }

    console.log('[Coach] Success! Reply length:', reply.length)
    return NextResponse.json({ reply, source: 'gemini' })

  } catch (err) {
    console.error('[Coach] Unexpected error:', err)
    return NextResponse.json(
      { reply: `Network error: ${err instanceof Error ? err.message : 'Unknown'}. Check your internet connection.` },
      { status: 500 }
    )
  }
}
