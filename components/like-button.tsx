"use client";
import { useOptimistic } from "react";
import { likeTweet } from "@/service/like-service";
import { dislikeTweet } from "@/service/like-service";

interface LikeButtonProps {
    isLiked: boolean;
    likeCount: number;
    tweetId: number;
  }
  

  export default function LikeButton({ isLiked, likeCount, tweetId }: LikeButtonProps) {
  const [state, toggle] = useOptimistic(
    { isLiked, likeCount },
    (prev) => ({
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
    })
  );

  const onClick = () => {
    toggle(null);
    if (state.isLiked) dislikeTweet(tweetId);
    else likeTweet(tweetId);
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full p-2 border transition-colors ${
        state.isLiked ? "bg-red-500 text-white border-red-500" : "border-gray-300 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <span>{state.isLiked ? state.likeCount : `Like (${state.likeCount})`}</span>
    </button>
  );
}
