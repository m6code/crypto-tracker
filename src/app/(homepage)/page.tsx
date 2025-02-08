import { Suspense } from "react";

import CryptoTable from "@/components/ui/table";
import Spinner from "@/components/ui/spinner";

export default function Home() {
    return (
        <div>
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Top 100 Cryptocurrencies</h1>
                <Suspense fallback={<Spinner />}>
                    <CryptoTable/>
                </Suspense>
            </div>
        </div>
    );
}
