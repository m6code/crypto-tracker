import { Suspense } from "react";
import CryptoTable from "@/components/ui/table";

export default function Home() {
    return (
        <div>
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Top 100 Cryptocurrencies</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <CryptoTable/>
                </Suspense>
            </div>
        </div>
    );
}
