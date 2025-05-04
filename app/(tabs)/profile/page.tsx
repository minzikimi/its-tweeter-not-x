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
    <main className="p-8 min-h-screen bg-black text-white flex flex-col justify-center items-center gap-6">
      <h1 className="text-4xl font-bold text-neutral-400">
        Welcome <span className="text-white ">{user?.username}</span>!
      </h1>
      <form action={logOut} className="w-full max-w-xs flex flex-col items-center">
        <Button text="Log out" />
      </form>
    </main>
  );
}
