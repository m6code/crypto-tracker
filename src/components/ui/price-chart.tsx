'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { fetchCoinHistory } from '@/services/coingecko'

interface PriceChartProps {
    coinId: string
}

export default function PriceChart({ coinId }: PriceChartProps) {
    const [data, setData] = useState([])

    useEffect(() => {
        const loadHistory = async () => {
            const history = await fetchCoinHistory(coinId)
            setData(history)
        }
        loadHistory()
    }, [coinId])

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )
}
