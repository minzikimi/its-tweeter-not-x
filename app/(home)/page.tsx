"use client";

import Button from "@/components/btn";
import Input from "@/components/input";
import { useActionState } from "react";
import { handleForm } from "./action";
import db from "@/lib/db";

export default function Home() {
  const [state, dispatch] = useActionState(handleForm, {
    errors: {
      email: [],
      password: [],
      username :[],
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
            type="text"
            name="username"
            placeholder="Username"
            required
            errors={state.errors.username}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25v-.75A6.75 6.75 0 0 1 11.25 12.75h1.5a6.75 6.75 0 0 1 6.75 6.75v.75"
                />
              </svg>
            }
          />
        <Input
        type="email"
        name="email"
        placeholder="Email"
        required
        errors={state.errors.email}
        icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      }
    />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        required
        errors={state.errors.password}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75A4.5 4.5 0 0 0 12 2.25v0a4.5 4.5 0 0 0-4.5 4.5V10.5M4.5 10.5h15a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-7.5a1.5 1.5 0 0 1 1.5-1.5Z"
            />
          </svg>
        }
      />
          <Button text="Log in" />
        </form>
      </div>
    </main>
  );
}
