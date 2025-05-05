// app/users/[username]/edit/page.tsx
"use client";
import { useFormState } from "react-dom";
import { updateProfile } from "./actions";

export default function EditProfile() {
  const [state, action] = useFormState(updateProfile, null);
  
  return (
    <form action={action}>
      <input name="username" />
      <input name="email" type="email" />
      <textarea name="bio" />
      <button>Update</button>
    </form>
  );
}
