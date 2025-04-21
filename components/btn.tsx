"use client"; //WHY

import { useFormState, useFormStatus } from "react-dom";


interface ButtonProps{
    text:string;
}

export default function Button({text}:ButtonProps){

    const {pending} = useFormStatus();

    return(
        <button
        type="submit"
        disabled={pending}
        className={`w-full py-2 mt-4 rounded-md font-semibold transition ${
          pending
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#7ff5dd] text-black hover:bg-[#68d9c6]"
        }`}
      >
        {pending ? "Loading..." : text}
      </button>
    )
}