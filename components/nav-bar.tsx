"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname(); 

  const baseClass =
    "flex flex-col items-center gap-1 w-full py-2 text-center transition-all duration-200";
  const activeClass = "font-bold text-cyan-400";
  const hoverClass = "hover:bg-white/10 hover:text-pink-300 rounded-md";

  return (
    <div className="bg-neutral-900 fixed bottom-0 w-full flex justify-between items-center px-6 py-3 border-t border-neutral-700 text-white backdrop-blur-md shadow-md z-50">
      <Link href="/" className={`${baseClass} ${hoverClass}`}>
        <span
          className={`${pathname === "/" ? activeClass : ""}`}
          style={{ fontFamily: "RocketPop" }}
        >
          Home
        </span>
      </Link>

      <Link href="/profile" className={`${baseClass} ${hoverClass}`}>
        <span
          className={`${pathname === "/profile" ? activeClass : ""}`}
          style={{ fontFamily: "RocketPop" }}
        >
          Profile
        </span>
      </Link>
    </div>
  );
}
