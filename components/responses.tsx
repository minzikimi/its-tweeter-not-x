import { useOptimistic } from "react";
import { useFormState } from "react-dom";
import { addTweetResponse } from "@/service/response-service";
import { z } from "zod";

interface User {
    id: number;
    username: string;
  }
  
  interface ResponseItem {
    id: number;
    text: string;
    created_at: Date | string;
    tweetId: number;
    user: User;
  }
  
  interface ResponsesProps {
    initialResponses: ResponseItem[];
    tweetId: number;
    username: string;
  }
  
  export default function Responses({ initialResponses, tweetId, username }: ResponsesProps) {
  const responseSchema = z
    .string({ required_error: "Response is required." })
    .trim()
    .max(200, "Response must be 200 characters or less.");

  // useOptimistic에 타입지정..
  const [responses, addResponse] = useOptimistic<ResponseItem[], string>(
    initialResponses,
    (prev, newText) => [
      ...prev,
      {
        id: Date.now(),
        text: newText,
        created_at: new Date(),
        tweetId,
        user: { username, id: Infinity },
      },
    ]
  );

  const handleSubmit = (_: unknown, formData: FormData) => {
    const text = formData.get("text");
    const validation = responseSchema.safeParse(text);
    if (validation.success) {
      addResponse(validation.data);
      addTweetResponse(formData);
    } else {
      return validation.error.flatten();
    }
  };

  const [state, action] = useFormState(handleSubmit, null);

  return (
    <div className="flex flex-col gap-3 w-full">
      <form action={action} className="flex gap-2 w-full">
        <input
          name="text"
          type="text"
          placeholder="Write a response"
          required
          className="flex-1 p-2 border rounded"
        />
        <input type="hidden" name="tweetId" value={tweetId} />
        <button className="ml-auto p-3 rounded-xl bg-gray-300 min-w-[56px]">Add</button>
      </form>
      {state?.fieldErrors?.text && (
        <span className="text-sm text-red-500">{state.fieldErrors.text}</span>
      )}
      {responses.map((res) => (
        <div key={res.id} className="flex items-center gap-4 my-2 text-base">
          <strong className="w-1/4">{res.user.username}</strong>
          <span>{res.text}</span>
        </div>
      ))}
    </div>
  );
}
