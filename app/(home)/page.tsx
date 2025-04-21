"use client";

import Button from "@/components/btn";
import Input from "@/components/input";
import { useActionState } from "react";
import { handleForm } from "./action";

export default function Home() {
  const [state, dispatch] = useActionState(handleForm, {
    errors: {
      email: [],
      password: [],
    },
  });

  return (
    <main
      className="p-8 min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/images/y2kbg.jpg')" }}
    >
      <div className="bg-white p-8 min-w-md">
        <h1
          className="text-5xl font-bold text-center mb-6 text-gray-800"
          style={{ fontFamily: "RocketPop" }}
        >
          Log-in
        </h1>
        <form action={dispatch} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            errors={state.errors.email}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            errors={state.errors.password}
          />
          <Button text="Log in" />
        </form>
      </div>
    </main>
  );
}
