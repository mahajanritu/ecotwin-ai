const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function askGroq(prompt: string, systemPrompt: string, fallback: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey || !apiKey.startsWith('gsk_')) {
    return fallback
  }

  try {
    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      console.warn('[Groq] Non-chat request failed:', data.error?.message ?? res.status)
      return fallback
    }

    const reply = data.choices?.[0]?.message?.content?.trim()
    return reply || fallback
  } catch (err) {
    console.warn('[Groq] Non-chat request error:', err)
    return fallback
  }
}

export async function generateClimateTwinNarrative(co2: number, score: number): Promise<string> {
  const tonnes = (co2 / 1000).toFixed(1)
  const fallback = `At ${tonnes} tonnes of CO2 per year and an EcoScore of ${score}/100, there's real room to grow. Small, consistent changes, like cutting flights and switching to renewables, could move you toward a Net Zero future by 2030.`

  return askGroq(
    `A user has an annual carbon footprint of ${tonnes} tonnes CO2 and an EcoScore of ${score}/100. Write 2-3 sentences that are personalized, specific, and motivating, describing their current impact and what their "Net Zero Self" by 2030 could look like. Include at least one concrete number or comparison.`,
    'You are EcoTwin AI, a friendly sustainability coach. Give specific, data-driven, encouraging feedback in 2-3 sentences.',
    fallback
  )
}

export async function generateActionPlan(co2: number, topCategory: string): Promise<string> {
  const tonnes = (co2 / 1000).toFixed(1)
  const fallback = `Your biggest carbon source is ${topCategory}. Focus there first, even a 20% reduction in this category alone could meaningfully lower your ${tonnes}t annual footprint.`

  return askGroq(
    `A user's biggest carbon source is "${topCategory}" in their ${tonnes}t annual footprint. Give ONE specific, actionable change they can make this week, with estimated CO2 savings and any cost impact. Be direct and practical, 2-3 sentences.`,
    'You are EcoTwin AI, a sustainability coach. Give specific, practical, encouraging advice with concrete CO2 numbers.',
    fallback
  )
}