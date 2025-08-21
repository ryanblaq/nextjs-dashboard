"use client";

import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { MoonIcon, PowerIcon, SunIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";

export default function SideNav() {
  const handleSignOut = async () => {
    try {
      await fetch("/api/signout", { method: "POST" });
      window.location.href = "/";
    } catch {
      console.log("Error signing out.")
    }
  };

  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const shouldBeDark = saved ? saved === "dark" : prefersDark;
    setDarkMode(shouldBeDark);

    const html = document.documentElement;
    html.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleDarkMode = useCallback(() => {
    const next = !darkMode;
    setDarkMode(next);
    const html = document.documentElement;
    html.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }, [darkMode]);
  
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40 dark:bg-sky-700 dark:text-slate-100"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block dark:bg-slate-700" />

        <button
          type="button"
          onClick={toggleDarkMode}
          aria-pressed={darkMode}
          title="Toggle theme"
          className="mb-2 flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-slate-700 dark:text-slate-100 hover:dark:bg-slate-300 hover:dark:text-slate-700"
        >
          {darkMode ? <SunIcon className="w-6" /> : <MoonIcon className="w-6" />}
          <div className="hidden md:block">Toggle Theme</div>
        </button>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-slate-700 dark:text-slate-100 hover:dark:bg-slate-300 hover:dark:text-slate-700"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}