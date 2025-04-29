"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMoreTweets } from "@/app/(tabs)/(home)/action";
import { InitialTweets } from "@/app/(tabs)/(home)/page";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(initialTweets.length < 5); 

  const handleNext = async () => {
    const nextPage = page + 1;
    const newTweets = await getMoreTweets(nextPage);
    if (newTweets.length > 0) {
      setTweets(newTweets);
      setPage(nextPage);
      if (newTweets.length < 5) setIsLastPage(true);
    } else {
      setIsLastPage(true);
    }
  };

  const handlePrev = async () => {
    const prevPage = Math.max(page - 1, 0);
    const newTweets = await getMoreTweets(prevPage);
    setTweets(newTweets);
    setPage(prevPage);
    setIsLastPage(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {tweets.map((tweet) => (
        <div key={tweet.id} className="border-b pb-4">
          <Link href={`/tweets/${tweet.id}`} className="text-lg font-medium">
            {tweet.tweet}
          </Link>
          <p className="text-sm text-gray-500">{tweet.created_at.toString()}</p>
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="px-4 py-2 bg-[#7ff5dd] rounded-md disabled:opacity-50"
        >
          ← Previous
        </button>
        <span className="self-center text-sm text-gray-700">Page {page + 1}</span>
        <button
          onClick={handleNext}
          disabled={isLastPage}
          className="px-4 py-2 bg-[#7ff5dd] rounded-md disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
