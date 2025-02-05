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
