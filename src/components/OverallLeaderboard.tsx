"use client";
import { Pixelify_Sans } from "next/font/google";
import { useEffect } from "react";
import { helix } from "ldrs";

interface UserData {
  id: string;
  name: string;
  address: string;
  totalGamesPlayed: number;
  totalGamesClaimed: number;
  totalPointsWon: number;
}

interface Props {
  users: UserData[];
}
const pxsans = Pixelify_Sans({ subsets: ["latin"] });

export default function OverallLeaderboard({ users }: Props) {
  useEffect(() => {
    if (typeof window !== undefined) {
      helix.register();
      console.log("Inside Leaderboard");
      console.log(users);
    }
  }, [users]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 border-2 rounded-lg shadow-md heropattern-pixeldots-slate-50">
      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className={`${pxsans.className}`}>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-xl font-semibold text-gray-900 sm:pl-0"
                  >
                    <a href="#" className="group inline-flex">
                      Ranking
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left  text-xl font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Name
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left  text-xl font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Matches
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left  text-xl font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Points
                    </a>
                  </th>
                  <th
                    scope="col"
                    className="hidden md:block px-3 py-3.5 text-left  text-xl font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Wallet Address
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 heropattern-floortile-slate-100">
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span title={user.address}>{user.name}</span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.totalGamesClaimed}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.totalPointsWon}
                    </td>
                    <td className="hidden md:block whitespace-nowrap px-3 py-4 text-sm text-neutral-700 underline hover:text-neutral-400">
                      <a
                        href={
                          `https://sepolia.arbiscan.io/address/` + user.address
                        }
                        target="_blank"
                      >
                        {user.address}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
