"use client";

import Button from "@/components/btn";
import Input from "@/components/input";
import { useActionState } from "react";
import { createAccount } from "./actions"; 
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";




export default function CreateAccount() {
 
  const [state, dispatch] = useActionState(createAccount, null);

  return (
    <main
      className="p-8 min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/images/y2kbg.jpg')" }}
    >
      <div className="bg-white p-8 min-w-md w-full max-w-md rounded-md shadow-md">
        <div className="flex flex-col gap-2 mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Hej!</h1>
          <h2 className="text-lg text-gray-600">Fill in the form below to join!</h2>
        </div>
        <form action={dispatch} className="flex flex-col gap-4">
          <Input
            name="username"
            type="text"
            placeholder="Username"
            required
            errors={
              state && "fieldErrors" in state
                ? state.fieldErrors.username
                : undefined
            }
            minLength={3}
            maxLength={10}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={
              state && "fieldErrors" in state
                ? state.fieldErrors.email
                : undefined
            }
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            minLength={PASSWORD_MIN_LENGTH}
            required
            errors={
              state && "fieldErrors" in state
                ? state.fieldErrors.password
                : undefined
            }
          />
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            minLength={PASSWORD_MIN_LENGTH}  
            required
            errors={
              state && "fieldErrors" in state
                ? state.fieldErrors.confirm_password
                : undefined
            }
          />
          <Button text="Create account" />
        </form>
       
      </div>
    </main>
  );
}
