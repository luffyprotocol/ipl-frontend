"use client";

import CTA from "@/components/CTA";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import PlayerCarousel from "@/components/TopPlayers";
import { useAccount } from "wagmi";

export default function Page() {
  const { address } = useAccount();

  return (
    <>
      <div className="bg-white overflow-x-hidden">
        <Hero />
        <CTA />
        <div className="mx-12 my-20">
          <p className="text-black font-bold text-3xl text-center pb-10">
            Top Players
          </p>
          <PlayerCarousel />
        </div>
        <Feature />
        {/* <Tools /> */
        /* <Team /> */}
      </div>
    </>
  );
}
