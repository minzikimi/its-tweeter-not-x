import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import db from "@/lib/db";

interface Tweet {
  id: number;
  tweet: string;  
  created_at: Date;  
  updated_at: Date;
  userId: number;
}

export default function TweetDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [tweet, setTweet] = useState<Tweet | null>(null);  

  useEffect(() => {
    if (id) {
      const fetchTweet = async () => {
        const tweetData = await db.tweet.findUnique({
          where: { id: parseInt(id as string) },
        });
        setTweet(tweetData); 
      };

      fetchTweet();
    }
  }, [id]);

  if (!tweet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl ">{tweet.tweet}</h1> 
      <p className="text-sm">Posted on {tweet.created_at.toString()}</p> 
      <div className="mt-4">
        <button className="px-4 py-2">Reply</button>
      </div>
    </div>
  );
}
