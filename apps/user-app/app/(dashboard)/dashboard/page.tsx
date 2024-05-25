import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { cookies } from "next/headers";
import { AllUser } from "../../../components/AllUser";
import { AllLinks } from "../../../components/AllLinks";

async function getBalnce (){
  const session = await getServerSession(authOptions);

  const balance = await prisma.balance.findFirst(
    {
      where : {
        userId : Number (session?.user?.id) 
      }
    }
  )
  
  return balance;
}

export default async function () {
  const session = await getServerSession(authOptions);
  
  const balance = await getBalnce();

  return <div>
    <div className="text-4xl text-[#6a51a6] pl-4 pt-8 mb-8 font-bold">
        Hi, {session.user.name[0]?.toUpperCase()+session.user.name.slice(1)} 👋
    </div>
    <div className="text-lg pl-4 font-bold tracking-wide">
        Your balance : Rs {balance ? (balance.amount+balance.locked) /100 : 0 } /-
    </div>
    <div className="p-6 m-6 grid grid-cols-2">
      
      <AllUser/>
      <div className="pt-8 pl-4">
        <AllLinks/>
      </div>
    </div>
  </div>
}
