import Link from "next/link";

export default function NavBar() {
    return (
        <div className="bg-[#593D88] h-20 p-6 mb-4 flex items-center justify-between w-full">
            <h2 className="text-3xl font-bold text-white">
                <Link href="/">
                    Crypto Tracker
                </Link>
            </h2>
            <ul className="flex space-x-6 mr-6 text-purple-50 text-xl font-bold">
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/watchlist">
                        Watchlist
                    </Link>
                </li>
                <li>
                    Theme toggle
                </li>
            </ul>
        </div>
    )
}
