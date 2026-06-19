import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { message } = await req.json()
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return NextResponse.json({ reply: 'GROQ_API_KEY missing in .env.local', source: 'no-key' })
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: 'You are EcoCoach, a sustainability expert. Answer EXACTLY what the user asks in 3-4 sentences with specific facts and numbers. Never give generic advice.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
      max_tokens: 400,
      temperature: 0.7,
    }),
  })

  const data = await res.json()

  if (!res.ok || data.error) {
    return NextResponse.json({
      reply: 'Groq error: ' + (data.error?.message || res.status),
      source: 'error',
    })
  }

  const reply = data.choices?.[0]?.message?.content?.trim()
  return NextResponse.json({ reply: reply || 'No response', source: 'groq' })
}
