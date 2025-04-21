
"use client";

interface InputProps {
  type: string;
  placeholder: string;
  required?: boolean;
  name: string;
  errors?: string[];
}

export default function Input({
  type,
  placeholder,
  required = false,
  name,
  errors = [],
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 text-sm">{error}</span>
      ))}
    </div>
  );
}