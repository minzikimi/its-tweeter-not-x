import db from "@/lib/db";
import TweetList from "@/components/tweet-list";
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
    },
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Tweets</h1>
      <TweetList initialTweets={initialTweets} />
    </main>
  );
}
