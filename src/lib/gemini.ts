// ============================================
// EcoTwin AI — Google Gemini Free Tier Helper
// Model: gemini-1.5-flash (free, fast, generous quota)
// Get free key: https://aistudio.google.com/app/apikey
// ============================================

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>
    }
    finishReason?: string
  }>
  error?: {
    code: number
    message: string
    status: string
  }
}

/**
 * Send a message to Gemini and return the reply text.
 * Falls back to a contextual offline response if key is missing or API fails.
 */
export async function askGemini(
  userMessage: string,
  systemContext?: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey || apiKey === 'your-gemini-api-key' || apiKey.trim() === '') {
    console.warn('[Gemini] No API key configured — using fallback response')
    return getFallbackResponse(userMessage)
  }

  try {
    // Gemini uses "contents" array — system prompt goes as first "model" turn
    // for gemini-1.5-flash to respect it correctly
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = []

    if (systemContext) {
      // Inject system context as a leading user→model exchange
      contents.push({ role: 'user', parts: [{ text: systemContext }] })
      contents.push({
        role: 'model',
        parts: [{ text: 'Understood. I will follow these instructions for our conversation.' }],
      })
    }

    contents.push({ role: 'user', parts: [{ text: userMessage }] })

    const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.75,
          maxOutputTokens: 512,
          topK: 40,
          topP: 0.95,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        ],
      }),
    })

    const data: GeminiResponse = await res.json()

    // API returned an error object
    if (data.error) {
      console.error('[Gemini] API error:', data.error.code, data.error.message)
      if (data.error.code === 400) {
        return '⚠️ Gemini API key issue. Please check your GEMINI_API_KEY in .env.local — it should start with "AIzaSy".'
      }
      if (data.error.code === 429) {
        return "I'm getting a lot of requests right now! Please wait a moment and try again."
      }
      return getFallbackResponse(userMessage)
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
    if (!reply) {
      console.warn('[Gemini] Empty response:', JSON.stringify(data))
      return getFallbackResponse(userMessage)
    }

    return reply
  } catch (err) {
    console.error('[Gemini] Request failed:', err)
    return getFallbackResponse(userMessage)
  }
}

/**
 * Contextual offline fallback — much better than a generic error message.
 * Used when API key is missing or API is unreachable.
 */
function getFallbackResponse(prompt: string): string {
  const q = prompt.toLowerCase()

  if (q.includes('flight') || q.includes('travel') || q.includes('plane') || q.includes('aviation')) {
    return '✈️ Air travel is often the single biggest personal emission source. One return long-haul flight (e.g. India↔UK) emits ~1.8 tonnes CO₂ — more than 6 months of driving. Choosing train for trips under 700 km, or video calls instead of business travel, can cut this dramatically. If you must fly, choose economy class (business class emits 3x more per seat).'
  }
  if (q.includes('food') || q.includes('diet') || q.includes('meat') || q.includes('veg') || q.includes('eat')) {
    return '🥗 Food accounts for about 25% of global emissions. Beef is the worst offender — producing ~27kg CO₂ per kg of beef vs ~6kg for chicken and ~2kg for lentils. Swapping 2-3 beef meals per week for plant-based alternatives saves roughly 400kg CO₂ per year — and typically costs less too.'
  }
  if (q.includes('solar') || q.includes('energy') || q.includes('electricity') || q.includes('power') || q.includes('home')) {
    return '☀️ Home energy is highly actionable. In India, rooftop solar typically pays off in 4-6 years and saves ~₹80,000+ over 10 years. Even without solar: switching to LED bulbs (saves ~100kg CO₂/yr), using 5-star rated appliances, and setting your AC to 24°C instead of 18°C can cut home emissions by 15-20%.'
  }
  if (q.includes('car') || q.includes('driv') || q.includes('transport') || q.includes('bus') || q.includes('bike')) {
    return '🚗 Transport is typically 20-30% of personal emissions. Switching from a petrol car to public transport for your daily commute saves ~1.5 tonnes CO₂/year on average. An EV charged on India\'s grid saves ~50% vs petrol today — and improves as the grid gets greener. Cycling or walking for trips under 3 km is the best option (and free!).'
  }
  if (q.includes('shop') || q.includes('fashion') || q.includes('clothes') || q.includes('buy') || q.includes('plastic')) {
    return '🛍️ Fast fashion is one of the most overlooked sources — producing a single cotton t-shirt uses 2,700 litres of water and emits ~5kg CO₂. Choosing second-hand, buying less but better quality, and avoiding single-use plastics are powerful acts. Try a 30-day shopping pause — most people find they need less than they thought.'
  }
  if (q.includes('water') || q.includes('shower') || q.includes('bath')) {
    return '💧 Water use has an indirect carbon impact through heating and pumping. Cutting shower time from 10 minutes to 5 minutes saves ~50 litres daily. Fixing leaky taps, using full loads in washing machines, and collecting rainwater for plants are easy wins. In India\'s context, water conservation is also critical for local climate resilience.'
  }
  if (q.includes('offset') || q.includes('carbon credit') || q.includes('plant tree') || q.includes('neutralize')) {
    return '🌳 Carbon offsets can be valuable but vary hugely in quality. One mature tree absorbs ~21kg CO₂/year — so you\'d need ~300 trees to offset an average Indian footprint! Better to reduce first, offset what remains. Look for certified offsets (Gold Standard, VCS) that fund verifiable projects like cookstove distribution or renewable energy in India.'
  }

  // Generic but still useful sustainability advice
  return `🌍 Great question about "${prompt}"! To reduce your carbon footprint effectively, focus on the biggest impact areas first: air travel, diet (especially red meat), and home energy use. Small, consistent changes compound over time — even a 10% reduction in each category adds up to significant CO₂ savings annually. What specific area would you like to explore further?`
}

export async function generateClimateTwinNarrative(co2: number, score: number): Promise<string> {
  const prompt = `A user has an annual carbon footprint of ${(co2 / 1000).toFixed(1)} tonnes CO₂ and an EcoScore of ${score}/100. Write 2-3 sentences that are personalized, specific, and motivating — describe their current impact and what their "Net Zero Self" by 2030 could look like. Be concrete with numbers.`

  return askGemini(
    prompt,
    'You are EcoTwin AI, a friendly sustainability coach. Give specific, data-driven, encouraging feedback. Always include at least one concrete number or comparison.'
  )
}

export async function generateActionPlan(co2: number, topCategory: string): Promise<string> {
  const prompt = `A user's biggest carbon source is "${topCategory}" in their ${(co2 / 1000).toFixed(1)}t annual footprint. Give ONE specific, actionable change they can make this week, with estimated CO₂ savings and any cost impact. Be direct and practical.`

  return askGemini(
    prompt,
    'You are EcoTwin AI, a sustainability coach. Give specific, practical, encouraging advice with concrete CO₂ numbers. Keep it to 2-3 sentences.'
  )
}

/**
 * Analyze a receipt/bill image description and return carbon impact estimate
 */
export async function analyzeReceiptText(ocrText: string): Promise<{
  type: string
  co2Impact: number
  energyUsed?: number
  amount: number
  insights: string[]
  summary: string
}> {
  const prompt = `Analyze this text extracted from a receipt/bill and estimate its carbon impact:

"${ocrText}"

Respond with ONLY valid JSON (no markdown, no explanation), in this exact format:
{
  "type": "electricity|shopping|transport|food|unknown",
  "amount": <number in INR>,
  "co2Impact": <number in kg CO2>,
  "energyUsed": <number in kWh, only for electricity bills, else null>,
  "summary": "<one sentence describing what this is>",
  "insights": ["<insight 1>", "<insight 2>"]
}

For electricity bills: use 0.82 kg CO2 per kWh (India grid average).
For shopping: estimate based on category and amount spent.
If amount is unclear, make a reasonable estimate based on context.`

  const reply = await askGemini(prompt)

  try {
    // Strip any markdown code fences Gemini might add
    const clean = reply.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    // Fallback if Gemini doesn't return valid JSON
    return {
      type: 'unknown',
      amount: 0,
      co2Impact: 0,
      insights: ['Could not parse receipt data accurately.'],
      summary: 'Receipt analyzed (limited data extracted)',
    }
  }
}
