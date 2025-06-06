import db from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import getSession from "@/lib/session"; 

export default async function Profile({ params }: { params: { username: string } }) {

  const { username } = await params;
  const user = await db.user.findUnique({
    where: { username: params.username },
    include: { tweets: true },
  });

  if (!user) return notFound();

  const session = await getSession(); 

  return (
    <div>
      <h1>{user.username}</h1>
      {session?.id === user.id && (
        <Link href={`/users/${user.username}/edit`}>Edit</Link>
      )}
      {user.tweets.map(tweet => (
        <div key={tweet.id}>{tweet.tweet}</div> 
      ))}
    </div>
  );
}