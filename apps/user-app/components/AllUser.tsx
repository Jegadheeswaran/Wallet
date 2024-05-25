import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@repo/db/client";
import { Card } from "@repo/ui/card";
import { SendMoneyBtn } from "./sendMoneyBtn";
import { SendMoney } from "./SendMoney";

async function getAllUsers () {

    const session = await getServerSession(authOptions);

    const users = await prisma.user.findMany({
        where : {
            NOT : {
                id : Number (session?.user?.id)
            }
        },
        select : {
            id : true,
            name : true,
            number : true
        }
    })

    return users;
}

export const AllUser = async () => {
    const users = await getAllUsers();
    return <div className="">
        <h1 className="text-xl  border-b pb-2 text-center">All users</h1>
        {users.map((user)=>(
            <div
            key={user.id}
            className="flex justify-between items-center  p-4 "
        >
            <div className="text-lg font-medium tracking-wide">{user.name[0]?.toUpperCase()+user.name.slice(1)}</div>
            
            <SendMoneyBtn number={user.number} />
            
        </div>
        ))}
    </div>
}