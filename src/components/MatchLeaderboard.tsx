"use client";
import { Pixelify_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { helix } from "ldrs";
import request, { gql } from "graphql-request";
import axios from "axios";

const pxsans = Pixelify_Sans({ subsets: ["latin"] });

interface User {
  id: string;
  name: string;
  address: string;
}
interface MappedUsers {
  [address: string]: User;
}
interface FetchInput {
  mappedUsers: MappedUsers;
  gameId: string;
}
interface UserData {
  id: string;
  name: string;
  address: string;
  commitment: string;
  commitTx: string;
  points: number;
}

interface Props {
  fetched: boolean;
  setFetched: () => void;
  slug: string;
}
const fetchAllUsers = async ({
  gameId,
  mappedUsers,
}: FetchInput): Promise<UserData[]> => {
  try {
    const data = await request(
      "https://api.studio.thegraph.com/query/30735/luffy/version/latest",
      gql`
        query MyQuery($id: String) {
          predictions(where: { game: $id }) {
            id
            squadHash
            transactionHash
            claim {
              points
            }
            user {
              address
            }
          }
        }
      `,
      {
        id: gameId,
      }
    );

    // Extract ongoing matches from the data and set in state
    console.log(data);
    return (data as any).predictions
      .map((pred: any) => {
        if (mappedUsers[pred.user.address.toLowerCase()] === undefined) {
          return null;
        } else
          return {
            name: mappedUsers[pred.user.address.toLowerCase()].name,
            address: pred.user.address.toLowerCase(),
            commitment: pred.squadHash,
            commitTx: pred.transactionHash,
            points: pred.claim == null ? 0 : pred.claim.points,
          };
      })
      .filter((pred: any) => pred !== null);
  } catch (error) {
    console.error("Error fetching ongoing fixtures:", error);
    return [];
  }
};

export default function MatchLeaderboard({ fetched, setFetched, slug }: Props) {
  const [users, setUsers] = useState<UserData[]>([]);
  useEffect(() => {
    helix.register();
  }, []);

  useEffect(() => {
    console.log("HELLO");
    const fetchData = async () => {
      console.log("FETCHING data");
      const response = await axios.get(`/api/dynamic/fetch-users`, {
        headers: {},
      });
      const data = response.data;
      if (data.success) {
        const _mappedUsers: MappedUsers = {};
        data.data.users.forEach((user: any) => {
          _mappedUsers[user.walletPublicKey.toLowerCase()] = {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            address: user.walletPublicKey.toLowerCase() || "0x",
          };
        });
        const _userData = await fetchAllUsers({
          mappedUsers: _mappedUsers,
          gameId: "0x" + parseInt(slug).toString(16),
        });
        console.log(_userData);
        setUsers(_userData);
        setFetched();
      }
    };
    fetchData();

    return () => {};
  }, []);

  return users.length != 0 ? (
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
                      Points
                    </a>
                  </th>

                  <th
                    scope="col"
                    className="hidden md:block px-3 py-3.5 text-left  text-xl font-semibold text-gray-900"
                  >
                    <a href="#" className="group inline-flex">
                      Commitment Hash
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 heropattern-floortile-slate-100">
                {users
                  .sort((a, b) => b.points - a.points)
                  .map((user, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span title={user.address}>{user.name}</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.points}
                      </td>

                      <td className="hidden md:block whitespace-nowrap px-3 py-4 text-sm text-neutral-700 underline hover:text-neutral-400">
                        <a
                          href={
                            `https://sepolia.arbiscan.io/tx/` + user.commitTx
                          }
                          target="_blank"
                        >
                          {user.commitment}
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
  ) : fetched ? (
    <div className="h-screen w-full flex justify-center items-start mt-32">
      <p>No one played this game :/</p>
    </div>
  ) : (
    <div></div>
  );
}
