"use client";

import { useRouter } from "next/navigation";

export const AllTransaction = () => {
  const router = useRouter();
  return (
    <div className="pt-4 flex justify-center">
      <button
        onClick={() => {
          router.push("/transactions");
        }}
        type="button"
        className="font-bold bg-[#a855f7] text-white hover:bg-[#581c87] focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-2xl text-sm px-5 py-2.5 me-2 mb-2"
      >
        View all transactions
      </button>
    </div>
  );
};
