import Button from "@/components/btn";
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
    redirect("/login");
  };
  return (
    <main className="p-8 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 min-w-[320px] flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome! <span className="text-neutral-500">{user?.username}</span>!
        </h1>
        <form action={logOut} className="w-full flex flex-col items-center">
          <Button text="Log out"></Button>
        </form>
      </div>
    </main>
  );
}
