// app/tweets/[id]/page.tsx

import db from "@/lib/db";
import { notFound } from "next/navigation";

async function getTweet(id: number) {
  return db.tweet.findUnique({
    where: { id },
  });
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{tweet.tweet}</h1>
      <p className="text-sm text-gray-500 mb-8">
        Posted on {tweet.created_at.toLocaleString()}
      </p>
      <div className="mt-4">
        <button className="px-4 py-2">Reply</button>
      </div>
    </div>
  );
}
