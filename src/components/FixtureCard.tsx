import fetchFixtures from "@/utils/supabaseFunctions/fetchFixtures";
import {
  PlusIcon,
  ChartBarIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FixtureCard(props: {
  fixtures: {
    id: number;
    team1: string;
    team2: string;
    title: string;
  }[];
  state: number;
}) {
  const { fixtures, state } = props;
  const [games, setGames] = useState<boolean[]>([]);

  useEffect(() => {
    // get start time of a match from supabase
    if (state == 1) {
      (async function () {
        const { message, response } = await fetchFixtures();
        const currentTime = new Date();
        const games: any[] = [];
        if (message === "Success") {
          fixtures.forEach((fixture) => {
            const matching = response.find(
              (item: any) => item.matchId === fixture.id
            );
            console.log("MATCHIGN");
            console.log(matching);
            if (matching) {
              const startTime = new Date(Number(matching.startDate));
              console.log(currentTime);
              console.log(startTime);
              games.push(currentTime > startTime);
            }
          });
        }
        console.log(games);
        setGames(games);
      })();
    }

    // check if the current time is over start time
    // then remove the option of Update squad in the Ongoing Fixtures tab
  }, [state]);
  return (
    <>
      <div className="hidden md:block relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 p-14 ">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
        >
          {fixtures.map((person, index) => (
            <li
              key={person.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {person.team1.split(" ")[0]} vs{" "}
                      {person.team2.split(" ")[0]}
                    </h3>
                    <span
                      className={`inline-flex flex-shrink-0 items-center rounded-full  px-1.5 py-0.5 text-xs font-medium ${
                        state == 3
                          ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                          : state == 2
                          ? "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
                          : state == 1
                          ? "bg-neutral-50 text-neutral-700 ring-1 ring-inset ring-neutral-600/20"
                          : "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                      }`}
                    >
                      {state == 3
                        ? "Entries Closed"
                        : state == 2
                        ? "Claim Points Now"
                        : state == 1
                        ? "Waiting For Results"
                        : "Entries Open"}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500 mb-4">
                    {person.title}
                  </p>
                </div>
                <img
                  className="h-24 rounded-full flex-shrink-0 "
                  src={`/${person.team1}.png`}
                  alt=""
                />
                <img
                  className="h-24 rounded-full flex-shrink-0  "
                  src={`/${person.team2}.png`}
                  alt=""
                />
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  {state > 1 && (
                    <div className="flex w-0 flex-1">
                      <Link
                        href={`/leaderboard/${person.id}`}
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                      >
                        {" "}
                        <ChartBarIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        View Leaderboard
                      </Link>
                    </div>
                  )}

                  {state != 3 && !games[index] && (
                    <div className="-ml-px flex w-0 flex-1">
                      <Link
                        href={
                          state == 2
                            ? `/results/${person.id}`
                            : `/fixtures/${person.id}`
                        }
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                      >
                        {state == 0 ? (
                          <PlusIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <ViewfinderCircleIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        )}
                        {state == 0
                          ? "Make Squad"
                          : state == 2
                          ? "View Squad"
                          : "Update Squad"}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="block md:hidden">
        <div className="grid grid-cols-1 gap-4 w-full mx-auto">
          {fixtures.map((person, index) => (
            <div
              key={index}
              className="mt-4 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div>
                <div className="flex justify-center space-x-2 ">
                  <Image
                    src={`/${person.team1}.png`}
                    width={90}
                    height={90}
                    alt="team1"
                  />
                  <Image
                    src={`/${person.team2}.png`}
                    width={90}
                    height={90}
                    alt="team2"
                  />
                </div>
                <div className="flex justify-center">
                  <p
                    className={`rounded-full mb-1  px-1.5 py-0.5 text-xs font-medium ${
                      state == 3
                        ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                        : state == 2
                        ? "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
                        : state == 1
                        ? "bg-neutral-50 text-neutral-700 ring-1 ring-inset ring-neutral-600/20"
                        : "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                    }`}
                  >
                    {state == 3
                      ? "Entries Closed"
                      : state == 2
                      ? "Claim Points Now"
                      : state == 1
                      ? "Waiting For Results"
                      : "Entries Open"}
                  </p>
                </div>

                <h3 className="truncate text-sm font-semibold text-center text-gray-900">
                  {person.team1.split(" ")[0]} vs {person.team2.split(" ")[0]}
                </h3>
                <p className="my-2 truncate text-sm text-gray-500 text-center">
                  {person.title}
                </p>
                <div></div>
              </div>
              {state > 1 && (
                <Link
                  href={`/leaderboard/${person.id}`}
                  className="flex justify-center mt-2 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <ChartBarIcon
                    className="h-5 w-5 mr-2 text-gray-400"
                    aria-hidden="true"
                  />
                  <p> View Leaderboard</p>
                </Link>
              )}
              {state != 3 && !games[index] && (
                <Link
                  href={
                    state == 2
                      ? `/results/${person.id}`
                      : `/fixtures/${person.id}`
                  }
                  className="flex justify-center rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  {state == 0 ? (
                    <PlusIcon
                      className="h-5 w-5 mr-2 text-gray-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <ViewfinderCircleIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                  {state == 0
                    ? "Make Squad"
                    : state == 2
                    ? "View Squad"
                    : "Update Squad"}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
