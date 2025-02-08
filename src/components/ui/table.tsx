'use client'

import { useEffect, useState } from 'react'
import { Table, Input } from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import Image from "next/image";
import Link from "next/link";

import {addCoin, isCoinInWatchlist, removeCoin} from '@/lib/redux/features/watchlist-slice'
import { fetchTopCoins } from '@/services/coingecko'
import type { Coin } from '@/types'
import type { RootState } from "@/lib/redux/store";


export default function CryptoTable() {
    const [coins, setCoins] = useState<Coin[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch()
    const watchlistCoins = useSelector((state: RootState) => state.watchlist)

    useEffect(() => {
        const loadCoins = async () => {
            const data = await fetchTopCoins()
            setCoins(data)
        }
        loadCoins()
    }, [])

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (coin: Coin) => (
                <Link href={`/coin/${coin.id}`}>
                    <div className="flex items-center gap-2">
                        <Image
                            src={coin.image}
                            alt={coin.name}
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full"
                        />
                        <span>{coin.name}</span>
                        <span className="text-gray-500 uppercase">({coin.symbol})</span>
                    </div>
                </Link>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'current_price',
            render: (price: number) => (
                <span>${price.toLocaleString()}</span>
            ),
        },
        {
            title: '24h Change',
            dataIndex: 'price_change_percentage_24h',
            render: (change: number) => (
                <span className={change >= 0 ? 'text-green-500' : 'text-red-500'}>
          {change.toFixed(2)}%
        </span>
            ),
        },
        {
            title: 'Market Cap',
            dataIndex: 'market_cap',
            render: (marketCap: number) => (
                <span>${marketCap.toLocaleString()}</span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (coin: Coin) => (
                <button
                    onClick={() => isCoinInWatchlist(watchlistCoins, coin.id) ? dispatch(removeCoin(coin.id)) : dispatch(addCoin(coin))}
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm lg:min-w-[169px] ${isCoinInWatchlist(watchlistCoins, coin.id) && 'bg-red-600 hover:bg-red-500'} `}
                >
                    {isCoinInWatchlist(watchlistCoins, coin.id)? 'Remove from Watchlist' : 'Add to Watchlist' }
                </button>
            ),
        },
    ]

    return (
        <div className="space-y-4">
            <div className="w-full flex flex-col items-end">
                <Input
                    placeholder="Search cryptocurrencies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                />
            </div>
            <Table
                columns={columns}
                dataSource={filteredCoins}
                rowKey="id"
                pagination={{
                    pageSize: 100,
                    showSizeChanger: true,
                }}
            />
        </div>
    )
}
