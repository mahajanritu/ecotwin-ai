import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'


// GET /api/environment/insights?lat=21.17&lon=72.83&city=Surat
//
// Uses FREE APIs:
// - OpenWeather (free tier): https://openweathermap.org/api — get free key at openweathermap.org
// - OpenAQ (completely free, no key needed): https://docs.openaq.org/

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const lat = searchParams.get('lat') || '21.17'
    const lon = searchParams.get('lon') || '72.83'
    const city = searchParams.get('city') || 'Surat'

    const apiKey = process.env.OPENWEATHER_API_KEY

    let weather = null
    if (apiKey) {
      try {
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        )
        if (weatherRes.ok) {
          const data = await weatherRes.json()
          weather = {
            temp: Math.round(data.main?.temp),
            description: data.weather?.[0]?.description,
            humidity: data.main?.humidity,
            windSpeed: data.wind?.speed,
          }
        }
      } catch (e) {
        console.warn('OpenWeather fetch failed:', e)
      }
    }

    // OpenAQ — no API key required for free tier
    let airQuality = null
    try {
      const aqRes = await fetch(
        `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}&radius=25000&limit=1`,
        { headers: { Accept: 'application/json' } }
      )
      if (aqRes.ok) {
        const data = await aqRes.json()
        const measurements = data.results?.[0]?.measurements
        const pm25 = measurements?.find((m: { parameter: string }) => m.parameter === 'pm25')
        if (pm25) {
          airQuality = {
            pm25: pm25.value,
            unit: pm25.unit,
            aqiLevel: pm25.value <= 12 ? 'Good' : pm25.value <= 35 ? 'Moderate' : pm25.value <= 55 ? 'Unhealthy for Sensitive Groups' : 'Unhealthy',
          }
        }
      }
    } catch (e) {
      console.warn('OpenAQ fetch failed:', e)
    }

    return NextResponse.json({
      success: true,
      city,
      weather: weather || { temp: 31, description: 'partly cloudy', humidity: 65, windSpeed: 3.2, demo: true },
      airQuality: airQuality || { pm25: 42, unit: 'µg/m³', aqiLevel: 'Moderate', demo: true },
    })
  } catch (err) {
    console.error('Environment insights error:', err)
    return NextResponse.json({ error: 'Failed to fetch environmental data' }, { status: 500 })
  }
}
