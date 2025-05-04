import db from "@/lib/db";
import { notFound } from "next/navigation";
import LikeButton from "@/components/like-button";
import Responses from "@/components/responses";
import getSession from "@/lib/session";

async function getTweet(id: number) {
  return db.tweet.findUnique({
    where: { id },
    include: {
      likes: true,
      responses: { include: { user: true } },
      user: true,
    },
  });
}
export default async function TweetDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();
  const tweet = await getTweet(id);
  if (!tweet) return notFound();

  const session = await getSession();
  const isLiked = tweet.likes.some(like => like.userId === session?.id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{tweet.tweet}</h1>
      <p className="text-sm text-gray-500 mb-8">
        Posted on {tweet.created_at.toLocaleString()}
      </p>
      <LikeButton
        isLiked={isLiked}
        likeCount={tweet.likes.length}
        tweetId={tweet.id}
      />
      <div className="mt-8">
        <Responses
          initialResponses={tweet.responses.map(r => ({
            ...r,
            text: r.content,
          }))}
          tweetId={tweet.id}
          username={session?.username ?? "Anonymous"}
        />
      </div>
    </div>
  );
}