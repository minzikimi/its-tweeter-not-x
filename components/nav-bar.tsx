"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className="bg-neutral-900 fixed bottom-0 w-full flex px-6 py-3 border-t border-neutral-700 z-50">
      <Link
        href="/"
        className={`flex-1 flex flex-col items-center py-2 mx-2 rounded-md font-semibold
          ${pathname === "/" ? "text-[#68d9c6]" : "text-white"}
        `}
      >
        Home
      </Link>
      <Link
        href="/profile"
        className={`flex-1 flex flex-col items-center py-2 mx-2 rounded-md font-semibold
          ${pathname === "/profile" ? "text-[#68d9c6]" : "text-white"}
        `}
      >
        Profile
      </Link>
    </div>
  );
}