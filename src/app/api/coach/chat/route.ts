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

    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey || !apiKey.startsWith('gsk_')) {
      return NextResponse.json({
        reply: 'AI coach is not configured yet. Please add a GROQ_API_KEY to enable real-time responses.',
        source: 'no-key',
      })
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 350,
      }),
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      const msg = data.error?.message ?? `HTTP ${res.status}`
      return NextResponse.json({ reply: `AI service error: ${msg}`, source: 'api-error' })
    }

    const reply = data.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      return NextResponse.json({ reply: 'Sorry, I got an empty response. Please try again.', source: 'empty' })
    }

    return NextResponse.json({ reply, source: 'groq' })
  } catch (err) {
    return NextResponse.json(
      { reply: `Network error: ${err instanceof Error ? err.message : 'Unknown'}. Please try again.` },
      { status: 500 }
    )
  }
}