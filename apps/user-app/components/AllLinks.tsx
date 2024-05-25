import Link from "next/link"

export const AllLinks = () => {

    return <div className="flex flex-col gap-4 px-4 mt-6">
				<Link
					href="/transactions"
					className="text-blue-700 font-light hover:underline"
				>
					Explore Your Transactions
				</Link>
				<Link
					href="/transfer"
					className="text-blue-700 font-light hover:underline"
				>
					Add Money to the Wallet
				</Link>
				<Link href="/p2ptransfer" className="text-blue-700 font-light hover:underline">
					Transfer Money using Mobile Number
				</Link>
			</div>
    
}