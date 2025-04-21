"use server";

import { redirect } from "next/navigation";

export async function handleForm(
  prevState: { errors: { email: string[]; password: string[] } },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  await new Promise(resolve => setTimeout(resolve, 2000)); 

  if (password === "12345") {
    redirect("/dashboard");
  }

  return {
    errors: {
      email: email ? [] : ["Type Email."],
      password: ["Wrong Password."],
    },
  };
}
