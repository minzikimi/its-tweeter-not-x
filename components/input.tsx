"use client";

import { ReactNode } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  required?: boolean;
  name: string;
  errors?: string[];
  icon?: ReactNode; 
  minLength?: number;  
  maxLength?: number;
}

export default function Input({
  type,
  placeholder,
  required = false,
  name,
  errors = [],
  icon,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={name}
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={`mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-[#68d9c6] focus:border-[#68d9c6] ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>

      {errors.map((error, index) => (
        <span key={index} className="text-red-500 text-sm">
          {error}
        </span>
      ))}
    </div>
  );
}
