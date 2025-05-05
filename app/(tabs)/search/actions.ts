"use server";
import db from "@/lib/db";

export async function searchTweets(prevState: any, formData: FormData) {
  const query = formData.get("q") as string;
  if (!query) return [];
  return db.tweet.findMany({
    where: { tweet: { contains: query } },
    include: { user: true },
  });
}
