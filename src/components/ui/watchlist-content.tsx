'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react'
import { useDispatch } from 'react-redux'

import { removeCoin } from '@/lib/redux/features/watchlist-slice'
import { fetchLatestPrices } from '@/services/coingecko'
import type { RootState } from '@/lib/redux/store'
import type { Coin } from '@/types'

export function WatchlistContent() {
    const dispatch = useDispatch()
    const watchlistCoins = useSelector((state: RootState) => state.watchlist.coins)
    const [latestPrices, setLatestPrices] = useState<Record<string, number>>({})
    const [priceChanges, setPriceChanges] = useState<Record<string, boolean>>({})

    useEffect(() => {
        const updatePrices = async () => {
            if (watchlistCoins.length === 0) return

            const coinIds = watchlistCoins.map(coin => coin.id).join(',')
            const newPrices = await fetchLatestPrices(coinIds)

            setLatestPrices(prevPrices => {
                // Track price changes for animation
                const changes: Record<string, boolean> = {}
                Object.keys(newPrices).forEach(coinId => {
                    if (prevPrices[coinId]) {
                        changes[coinId] = newPrices[coinId] > prevPrices[coinId]
                    }
                })
                setPriceChanges(changes)
                return newPrices
            })
        }

        // Update immediately and then every 30 seconds
        updatePrices()
        const interval = setInterval(updatePrices, 30000)

        return () => clearInterval(interval)
    }, [watchlistCoins])

    if (watchlistCoins.length === 0) {
        return <EmptyWatchlist />
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {watchlistCoins.map(coin => (
                <WatchlistCard
                    key={coin.id}
                    coin={coin}
                    latestPrice={latestPrices[coin.id]}
                    priceIncreased={priceChanges[coin.id]}
                    onRemove={() => dispatch(removeCoin(coin.id))}
                />
            ))}
        </div>
    )
}

interface WatchlistCardProps {
    coin: Coin
    latestPrice?: number
    priceIncreased?: boolean
    onRemove: () => void
}

function WatchlistCard({ coin, latestPrice, priceIncreased, onRemove }: WatchlistCardProps) {
    const priceColor = priceIncreased === undefined
        ? 'text-gray-900 dark:text-gray-400'
        : priceIncreased
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'

    return (
        <div className="relative group rounded-lg border border-gray-300 bg-slate-50 dark:bg-slate-800 dark:border-gray-600 p-4 hover:shadow-md transition-shadow">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={onRemove}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove from watchlist"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <Link
                href={`/coin/${coin.id}`}
                className="block space-y-4"
            >
                <div className="flex items-center gap-3">
                    <Image
                        src={coin.image}
                        alt={coin.name}
                        width={24}
                        height={24}
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <h3 className="font-medium">{coin.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-200 uppercase">{coin.symbol}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
            <span className={`text-xl font-semibold ${priceColor}`}>
              ${(latestPrice || coin.current_price).toLocaleString()}
            </span>
                        {priceIncreased !== undefined && (
                            priceIncreased ? (
                                <ArrowUpRight className="w-5 h-5 text-green-500" />
                            ) : (
                                <ArrowDownRight className="w-5 h-5 text-red-500" />
                            )
                        )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-200">
                        <span>Market Cap Rank</span>
                        <span>#{coin.market_cap_rank}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-200">
                        <span>24h Change</span>
                        <span className={coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                            {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

function EmptyWatchlist() {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center border-2 bg-slate-50 border-dashed rounded-lg dark:bg-gray-700 border-gray-200 dark:border-gray-800">
            <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Your watchlist is empty
                </h3>
                <p className="text-gray-500 dark:text-gray-200 max-w-sm">
                    Start tracking your favorite cryptocurrencies by adding them to your watchlist from the home page.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#593D88] rounded-md hover:bg-[#5A3F9A] transition-colors"
                >
                    Browse Cryptocurrencies
                </Link>
            </div>
        </div>
    )
}
