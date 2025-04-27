import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
 
 async function getUser() {
   const session = await getSession();
   if (session.id) {
     const user = await db.user.findUnique({
       where: {
         id: session.id,
       },
     });
     if (user) {
       return user;
     }
   }
   notFound();
 }
 
 export default async function Profile() {
   const user = await getUser();
   const logOut = async () => {
     "use server";
     const session = await getSession();
      session.destroy();
     redirect("/");
   };
   return (
    <main
      className="p-8 min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/images/y2kbg.jpg')" }}
    >
      <div className="bg-white shadow-xl rounded-2xl p-10 min-w-[320px] flex flex-col items-center">
        <h1
          className="text-4xl font-bold text-gray-800 mb-4"
          style={{ fontFamily: "RocketPop" }}
        >
          Welcome! <span className="text-purple-600">{user?.username}</span>!
        </h1>
        <form action={logOut} className="w-full flex flex-col items-center">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-pink-500 hover:to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
          >
            Log out
          </button>
        </form>
      </div>
    </main>
  );
 }  