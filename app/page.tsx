"use client";
import Hero from "./_components/Hero";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
export default function Home() {
  const { user }: any = useKindeBrowserClient();

  useEffect(() => {
    console.log("--", user);
  }),
    [user];

  return (
    <div className="">

      <Hero />
    </div>
  );
}
