"use client";
import MatchLeaderboard from "@/components/MatchLeaderboard";
import { fixtureDetails } from "@/utils/constants";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import request, { gql } from "graphql-request";
import Image from "next/image";
import { useEffect, useState } from "react";

function Page({ params }: { params: { slug: string } }) {
  const { isAuthenticated } = useDynamicContext();
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    console.log(params);
    console.log(isAuthenticated);
  }, [isAuthenticated, params]);

  return isAuthenticated ? (
    <div>
      <div className="bg-white  md:px-48 py-6 pt-12 sm:pt-32 lg:px-48 text-black min-h-screen">
        <div className={` ${!fetched && "h-screen"} `}>
          <div className="hidden md:flex justify-center space-x-4">
            <Image
              src={`/${fixtureDetails[params.slug].team1}.png`}
              width={130}
              height={130}
              alt="team1"
            />
            <Image src="/vs.png" width={100} height={100} alt="vs" />
            <Image
              src={`/${fixtureDetails[params.slug].team2}.png`}
              width={130}
              height={130}
              alt="team2"
            />
          </div>
          <div className="flex md:hidden mt-16 justify-center">
            <Image
              src={`/${fixtureDetails[params.slug].team1}.png`}
              width={100}
              height={100}
              alt="team1"
            />
            <Image src="/vs.png" width={80} height={80} alt="vs" />
            <Image
              src={`/${fixtureDetails[params.slug].team2}.png`}
              width={100}
              height={100}
              alt="team2"
            />
          </div>
          <p className="mb-6 text-sm text-neutral-600 mx-auto text-center">
            Note: If you don&apos;t see your profile or games played here, make
            sure you claimed the points for your squads in the fixtures page.
          </p>
          {!fetched && (
            <div className="flex flex-col items-center justify-start h-full w-full mt-24">
              <l-helix size="45" speed="2.5" color="black"></l-helix>
            </div>
          )}
        </div>
        <MatchLeaderboard
          fetched={fetched}
          setFetched={() => {
            setFetched(true);
          }}
          slug={params.slug}
        />
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div>
        <p className="text-black font-bold text-xl sm:text-3xl">
          Connect your wallet to get started
        </p>
        <div className="mx-auto flex justify-center mt-6">
          <DynamicWidget />
        </div>
      </div>
    </div>
  );
}
export default Page;
