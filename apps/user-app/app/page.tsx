import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
}

// "use client";

// import { useBalance } from "@repo/store/useBalance";

// export default function() {
//   const balance = useBalance();
//   return <div>
//     hi there {balance}
//   </div>
// }

//   {/* <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} ></Appbar> */}

//         {/* <div className=" p-6 m-6 b-2 flex justify-center bg-red-500 text-3xl"> Hey Dummy</div> */}
//         <div className="flex items-center justify-center h-screen">
//         <div className="w-full p-6 m-6 b-2 bg-red-500 text-3xl flex justify-center">
//         Hey Dummy
//     </div>
// </div>
//    {/* <div className=" p-6 m-6 b-2 flex justify-center bg-red-500 text-3xl"> Hey Dummy</div>
//       <Center>Helloo dummy</Center> */}
//       <div className="flex items-center justify-center h-screen">
//       <div className="w-full p-6 m-6 flex justify-center  bg-red-500 text-3xl ">
//        Hey Dummy
//      </div>
// </div>
//     <div>
//       {/* <Select></Select> */}
//     </div>
//     </>
