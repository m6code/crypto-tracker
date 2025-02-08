import { Suspense } from 'react'

import Spinner from "@/components/ui/spinner";
import { WatchlistContent } from '@/components/ui/watchlist-content'
// import { EmptyState } from '@/components/ui/empty-state'

export const metadata = {
    title: 'My Watchlist - Crypto Price Tracker',
    description: 'Track your favorite cryptocurrencies in real-time',
}

export default function WatchlistPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">My Watchlist</h1>
            <Suspense fallback={<Spinner />}>
                <WatchlistContent />
            </Suspense>
        </div>
    )
}
