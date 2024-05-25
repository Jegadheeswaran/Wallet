"use client";


import { useRouter } from "next/navigation";

export  const SendMoneyBtn = ({ number }: { number: string }) => {
	const router = useRouter();
	const handleClick = () => {
		
		router.push(`/p2ptransfer?number=${number}`);
	};
	return (
		<button
			className="bg-black text-white py-2 px-4 rounded-md"
			onClick={handleClick}
		>
			Send Money
		</button>
	);
};

