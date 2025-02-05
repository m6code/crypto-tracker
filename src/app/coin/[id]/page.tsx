import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getCoinDetails } from '@/services/coingecko'
import PriceChart  from '@/components/ui/price-chart'
// import { WatchlistButton } from '@/components/ui/watchlist-button'

interface PageProps {
    params: {
        id: string
    }
}

export default async function CoinPage({ params }: PageProps) {
    const coin = await getCoinDetails(params.id)

    if (!coin) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src={coin.image.large}
                        alt={coin.name}
                        className="w-16 h-16"
                    />
                    <div>
                        <h1 className="text-3xl font-bold">{coin.name}</h1>
                        <p className="text-gray-500 uppercase">{coin.symbol}</p>
                    </div>
                </div>
                {/*<WatchlistButton coin={coin} />*/}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Market Data</h2>
                    <dl className="space-y-2">
                        <div className="flex justify-between">
                            <dt>Current Price</dt>
                            <dd>${coin.market_data.current_price.usd.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt>Market Cap</dt>
                            <dd>${coin.market_data.market_cap.usd.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt>24h Volume</dt>
                            <dd>${coin.market_data.total_volume.usd.toLocaleString()}</dd>
                        </div>
                    </dl>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Price History</h2>
                    <Suspense fallback={<div>Loading chart...</div>}>
                        <PriceChart coinId={params.id} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
