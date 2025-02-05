import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
})

export async function fetchTopCoins(page = 1, perPage = 100) {
    try {
        const { data } = await api.get('/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: perPage,
                page,
                sparkline: false,
            },
        })
        return data
    } catch (error) {
        console.error('Error fetching top coins:', error)
        throw new Error('Failed to fetch top coins')
    }
}

export async function getCoinDetails(id: string) {
    try {
        const { data } = await api.get(`/coins/${id}`, {
            params: {
                localization: false,
                tickers: false,
                market_data: true,
                community_data: false,
                developer_data: false,
            },
        })
        return data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null
        }
        console.error(`Error fetching coin ${id}:`, error)
        throw new Error('Failed to fetch coin details')
    }
}

export async function fetchCoinHistory(id: string, days = 7) {
    try {
        const { data } = await api.get(`/coins/${id}/market_chart`, {
            params: {
                vs_currency: 'usd',
                days,
            },
        })

        return data.prices.map(([timestamp, price]: [number, number]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            price,
        }))
    } catch (error) {
        console.error(`Error fetching history for coin ${id}:`, error)
        throw new Error('Failed to fetch coin history')
    }
}

export async function fetchLatestPrices(coinIds: string) {
    try {
        const { data } = await api.get('/simple/price', {
            params: {
                ids: coinIds,
                vs_currencies: 'usd',
            },
        })

        // Transform response to { coinId: price } format
        return Object.entries(data).reduce((acc, [id, prices]: [string, any]) => {
            acc[id] = prices.usd
            return acc
        }, {} as Record<string, number>)
    } catch (error) {
        console.error('Error fetching latest prices:', error)
        return {}
    }
}

// Add rate limiting helper
function createRateLimiter(maxRequests: number, timeWindow: number) {
    let requests: number[] = []

    return {
        async waitForRateLimit() {
            const now = Date.now()
            requests = requests.filter(time => now - time < timeWindow)

            if (requests.length >= maxRequests) {
                const oldestRequest = requests[0]
                const timeToWait = timeWindow - (now - oldestRequest)
                await new Promise(resolve => setTimeout(resolve, timeToWait))
            }

            requests.push(now)
        }
    }
}

// Create rate limiter for CoinGecko API (50 requests per minute)
const rateLimiter = createRateLimiter(50, 60000)

// Wrap API calls with rate limiting
export async function fetchWithRateLimit<T>(
    apiCall: () => Promise<T>
): Promise<T> {
    await rateLimiter.waitForRateLimit()
    return apiCall()
}
