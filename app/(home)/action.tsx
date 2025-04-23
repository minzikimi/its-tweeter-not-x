"use server";

import { redirect } from "next/navigation";
import {boolean, z} from "zod";


function checkUserName (username:string):boolean{
  return username.length>=5;
}

const formSchema = z.object({
  email: z
    .string()
    .email("invalid email.")
    .refine(email => email.endsWith("@zod.com"), {
      message: "only @zod.com emails are allowed",
    }),

  username: z
    .string()
    .refine(checkUserName, {
      message: "username should be at least 5 characters long.",
    }),

  password: z
    .string()
    .min(10, "password must be at least 10 characters long.")
    .regex(/\d/, "password should contain at least one number."),
});


export async function handleForm(
  prevState: { errors: { email: string[]; password: string[]; username:string[] } },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  const result = formSchema.safeParse({ email, password, username });
  
  await new Promise(resolve => setTimeout(resolve, 2000)); 

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    return {
      errors: {
        email: fieldErrors.email || [],
        password: fieldErrors.password || [],
        username: fieldErrors.username || [],
      },
    };
  }

  if (password === "12345") {
    redirect("/dashboard");
  }

  return {
    errors: {
      email: email ? [] : ["Type Email."],
      password: ["Wrong Password."],
      username:[],
    },
  };
}
