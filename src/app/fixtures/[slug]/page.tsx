"use client";
import Logs from "@/components/Logs";
import Pitch from "@/components/Pitch";
import fetchMatchDetail from "@/utils/supabaseFunctions/fetchMatchDetails";
import { useEffect, useState } from "react";
import {
  allTeams,
  fixtureDetails,
  gameResults,
  playerIdRemappings,
  protocolAbi,
  protocolAddress,
} from "@/utils/constants";
import { createPublicClient, http } from "viem";
import { arbitrumSepolia, cronos } from "viem/chains";
import computeSquadHash from "@/utils/computeSquadHash";
import {
  DynamicWidget,
  createWalletClientFromWallet,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import DummyPlayerData from "@/components/DummyPlayerData";
import ChoosePlayers from "@/components/ChoosePlayers";
import { useAccount, useBalance } from "wagmi";
import DisplayGasModal from "@/components/DisplayGasModal";

export default function Page({ params }: { params: { slug: string } }) {
  const { isAuthenticated } = useDynamicContext();
  const { address } = useAccount();
  const [index, setindex] = useState(0);
  const [teams, setteams] = useState<string[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [squadUpdated, setSquadUpdated] = useState(false);
  const { primaryWallet } = useDynamicContext();
  const [displayGasModal, setDisplayGasModal] = useState(false);
  const { refetch } = useBalance({ address: address });

  const teamShortForms: { [key: string]: string } = {
    "Chennai Super Kings": "CSK",
    "Royal Challengers Bengaluru": "RCB",
    "Mumbai Indians": "MI",
    "Delhi Capitals": "DC",
    "Kolkata Knight Riders": "KKR",
    "Punjab Kings": "PBKS",
    "Rajasthan Royals": "RR",
    "Sunrisers Hyderabad": "SRH",
    "Gujarat Titans": "GT",
    "Lucknow Super Giants": "LSG",
  };
  interface Player {
    name: string;
    id: string;
    team:
      | "plain"
      | "csk"
      | "rcb"
      | "mi"
      | "dc"
      | "kkr"
      | "pbks"
      | "rr"
      | "srh"
      | "gt"
      | "lsg"
      | "pkbs"
      | "dc";
    type: "bat" | "bowl" | "ar" | "wk";
  }
  const [playerPositions, setPlayerPositions] = useState<Player[]>([
    {
      name: "Choose Player",
      id: "",
      type: "bat",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "bat",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "bat",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "bowl",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "bowl",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "bowl",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "ar",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "ar",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "ar",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "ar",
      team: "plain",
    },
    {
      name: "Choose Player",
      id: "",
      type: "wk",
      team: "plain",
    },
  ]);

  useEffect(() => {
    (async function () {
      const players = JSON.parse(localStorage.getItem("players") || "{}");
      if (players != null && players != undefined && address != undefined) {
        if (players[params.slug] == null || players[params.slug] == undefined)
          players[params.slug] = {};
        const squad = players[params.slug][address as any];

        if (squad != null && squad != undefined && teams.length > 0) {
          await fetchPlayers(squad.playerIds as any, teams);
          setSquadUpdated(true);
        }
      }
    })();
  }, [address, teams]);
  useEffect(() => {
    const fetchTeams = async () => {
      const { message, response } = await fetchMatchDetail(params.slug);
      if (message === "Success") {
        setteams([
          teamShortForms[response[0].team1],
          teamShortForms[response[0].team2],
        ]);
      }
    };

    fetchTeams();
  }, []);

  const fetchPlayers = async (playerIds: any, team: any) => {
    if (team[0] != "") {
      const team1 = allTeams[
        team[0].toLowerCase() as keyof typeof allTeams
      ] as any;
      const team2 = allTeams[
        team[1].toLowerCase() as keyof typeof allTeams
      ] as any;
      if (playerIds != undefined) {
        const matchedPlayers = playerIds.map((id: any) => {
          const team1Player = team1.player.find(
            (p: any) => p.id === (id as string)
          );
          const team2Player = team2.player.find(
            (p: any) => p.id === (id as string)
          );
          return team1Player
            ? {
                name: team1Player.name,
                id: team1Player.id,
                type: team1Player.role,
                team: teamShortForms[team1.name].toLowerCase(),
              }
            : team2Player
            ? {
                name: team2Player.name,
                id: team2Player.id,
                type: team2Player.role,
                team: teamShortForms[team2.name].toLowerCase(),
              }
            : { name: "Choose Player", id: "", type: "wk", team: "plain" }; // If player not found, return null
        });
        setPlayerPositions(matchedPlayers);
      }
    }
  };
  return isAuthenticated ? (
    <>
      <div className="pt-10 bg-white">
        <div className="w-full">
          {displayGasModal && (
            <DisplayGasModal
              state={displayGasModal}
              setModalState={(_state) => {
                setDisplayGasModal(_state);
              }}
            />
          )}
          <div className="hidden md:flex justify-center space-x-4 w-full mt-20">
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
          <div className="flex md:hidden justify-center w-full mt-20">
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
        </div>

        <div className="pt-12 ">
          <div className="relative overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-8  ">
            <div className="w-[90%] mx-auto flex flex-col sm:flex-row">
              <div className="block md:hidden flex flex-col items-center justify-center">
                <p className="py-2 text-black text-xl font-semibold text-center">
                  {squadUpdated ? "Update Squad" : "Create Squad"}
                </p>
                <button
                  className="mt-2 rounded-md mx-auto bg-[#01A4F1] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-neutral-400"
                  disabled={
                    playerPositions.filter((player) => player.id != "")
                      .length != 11
                  }
                  onClick={async () => {
                    const _logs = [];

                    try {
                      const { data } = await refetch();
                      if (
                        data?.formatted != undefined &&
                        parseFloat(data.formatted) > 0.02
                      ) {
                        const pIds = playerPositions.map((p) => p.id);
                        const remappedIds = pIds.map(
                          (id: any) =>
                            playerIdRemappings[params.slug as string][id]
                        );
                        let squad_hash: `0x${string}` = computeSquadHash(
                          Buffer.from(remappedIds)
                        );
                        _logs.push({
                          id: _logs.length + 1,
                          hash: "Computed Squad Hash successfully",
                          href: "",
                          username: squad_hash,
                        });
                        setLogs(_logs);
                        // send transaction on-chain

                        if (primaryWallet) {
                          const walletClient =
                            await createWalletClientFromWallet(primaryWallet);
                          const publicClient = createPublicClient({
                            chain: arbitrumSepolia,
                            transport: http(
                              `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ARBITRUM}`
                            ),
                          });
                          const { request } =
                            await publicClient.simulateContract({
                              address: protocolAddress as `0x${string}`,
                              abi: protocolAbi,
                              functionName: "registerSquad",
                              args: [params.slug, squad_hash],
                              account: primaryWallet.address as `0x${string}`,
                            });
                          const tx = await walletClient.writeContract(request);
                          console.log(tx);
                          _logs.push({
                            id: _logs.length + 1,
                            hash: "Transaction Sent successfully",
                            href: "https://sepolia.arbiscan.io/tx/" + tx,
                            username: tx,
                          });
                          setLogs(_logs);
                          let gameData = JSON.parse(
                            localStorage.getItem("players") || "{}"
                          );
                          if (!gameData[params.slug])
                            gameData[params.slug] = {};
                          gameData[params.slug][address as any] = {
                            squadHash: squad_hash,
                            playerIds: pIds,
                          };
                          localStorage.setItem(
                            "players",
                            JSON.stringify(gameData)
                          );
                          setSquadUpdated(true);
                        }
                      } else {
                        if (data?.formatted != undefined)
                          setDisplayGasModal(true);
                      }
                    } catch (e) {
                      console.log("Error Occured");
                      console.log(e);
                      _logs.push({
                        id: _logs.length + 1,
                        hash: "Transaction Rejected",
                        href: "",
                        username: "What made you change your mind? :/",
                      });
                      setLogs(_logs);
                    }
                  }}
                >
                  <p>Submit Squad</p>
                </button>
                <p className="font-normal text-neutral-500 italic text-xs py-1 text-center">
                  {squadUpdated
                    ? "Click on players to update your squad"
                    : `${
                        playerPositions.filter((player) => player.id != "")
                          .length
                      } selected, ${
                        playerPositions.filter((player) => player.id == "")
                          .length
                      } more to go`}
                </p>
              </div>
              {/* <div className="sm:w-[55%]"> */}
              <Pitch
                setindex={setindex}
                setOpen={setOpen}
                playerPositions={playerPositions}
                points={gameResults[params.slug]}
                showPoints={false}
              />
              {/* </div> */}
              <div className="sm:w-[45%] flex flex-col items-center mt-6 sm:mt-0">
                <div className="hidden md:block">
                  <button
                    className="mt-10 flex mx-auto items-center gap-x-6 rounded-md  bg-[#01A4F1] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-neutral-400"
                    disabled={
                      playerPositions.filter((player) => player.id != "")
                        .length != 11
                    }
                    onClick={async () => {
                      const _logs = [];
                      try {
                        const { data } = await refetch();
                        if (
                          data?.formatted != undefined &&
                          parseFloat(data.formatted) > 0.02
                        ) {
                          const pIds = playerPositions.map((p) => p.id);
                          const remappedIds = pIds.map(
                            (id: any) =>
                              playerIdRemappings[params.slug as string][id]
                          );
                          let squad_hash: `0x${string}` = computeSquadHash(
                            Buffer.from(remappedIds)
                          );
                          _logs.push({
                            id: _logs.length + 1,
                            hash: "Computed Squad Hash successfully",
                            href: "",
                            username: squad_hash,
                          });
                          setLogs(_logs);
                          // send transaction on-chain

                          if (primaryWallet) {
                            const walletClient =
                              await createWalletClientFromWallet(primaryWallet);
                            const publicClient = createPublicClient({
                              chain: arbitrumSepolia,
                              transport: http(
                                `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ARBITRUM}`
                              ),
                            });
                            const { request } =
                              await publicClient.simulateContract({
                                address: protocolAddress as `0x${string}`,
                                abi: protocolAbi,
                                functionName: "registerSquad",
                                args: [params.slug, squad_hash],
                                account: primaryWallet.address as `0x${string}`,
                              });
                            const tx = await walletClient.writeContract(
                              request
                            );
                            console.log(tx);
                            _logs.push({
                              id: _logs.length + 1,
                              hash: "Transaction Sent successfully",
                              href: "https://sepolia.arbiscan.io/tx/" + tx,
                              username: tx,
                            });
                            setLogs(_logs);
                            let gameData = JSON.parse(
                              localStorage.getItem("players") || "{}"
                            );
                            if (!gameData[params.slug])
                              gameData[params.slug] = {};
                            gameData[params.slug][address as any] = {
                              squadHash: squad_hash,
                              playerIds: pIds,
                            };
                            localStorage.setItem(
                              "players",
                              JSON.stringify(gameData)
                            );
                            setSquadUpdated(true);
                          }
                        } else {
                          if (data?.formatted != undefined)
                            setDisplayGasModal(true);
                        }
                      } catch (e) {
                        _logs.push({
                          id: _logs.length + 1,
                          hash: "Transaction Rejected",
                          href: "",
                          username: "What made you change your mind? :/",
                        });
                        setLogs(_logs);
                      }
                    }}
                  >
                    <p>Submit Squad</p>
                  </button>
                  <p className="font-normal text-neutral-500 italic text-xs py-1">
                    {squadUpdated
                      ? "Click on players to update your squad"
                      : `${
                          playerPositions.filter((player) => player.id != "")
                            .length
                        } selected, ${
                          playerPositions.filter((player) => player.id == "")
                            .length
                        } more to go`}
                  </p>
                  <p className="py-6 text-black text-3xl font-bold text-center">
                    {squadUpdated ? "Update Squad" : "Create Squad"}
                  </p>
                </div>

                <div className="hidden md:block mt-8 flow-root heropattern-pixeldots-slate-50 border-2 rounded-lg shadow-md md:px-6 md:mx-6">
                  <div className="">
                    <div className="inline-block min-w-full py-2 align-middle overflow-y-auto max-h-96">
                      <table className="min-w-full divide-y divide-gray-300 ">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 md:pl-4 md:pr-3 text-left text-xs font-semibold text-gray-900"
                            >
                              &emsp;&emsp; Name
                            </th>
                            <th
                              scope="col"
                              className="md:px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
                            >
                              Team
                            </th>

                            <th
                              scope="col"
                              className="hidden md:block md:px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
                            >
                              Role
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 md:pl-3 md:pr-4 sm:pr-0"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className=" max-h-96 overflow-y-auto">
                          {open == false ? (
                            <DummyPlayerData />
                          ) : (
                            <ChoosePlayers
                              index={index}
                              teams={teams}
                              open={open}
                              setOpen={setOpen}
                              setPlayerPositions={setPlayerPositions}
                              playerIds={playerPositions.map(
                                (player) => player.id
                              )}
                              slug={params.slug}
                            />
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {open && (
                  <div className="block md:hidden mt-8 flow-root heropattern-pixeldots-slate-50 border-2 rounded-lg shadow-md md:px-6 md:mx-6">
                    <div className="">
                      <div className="inline-block min-w-full py-2 align-middle overflow-y-auto max-h-96">
                        <table
                          id="choose"
                          className="min-w-full divide-y divide-gray-300 "
                        >
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 md:pl-4 md:pr-3 text-left text-xs font-semibold text-gray-900"
                              >
                                &emsp;&emsp; Name
                              </th>
                              <th
                                scope="col"
                                className="md:px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
                              >
                                Team
                              </th>

                              <th
                                scope="col"
                                className="hidden md:block md:px-3 py-3.5 text-left text-xs font-semibold text-gray-900"
                              >
                                Role
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 md:pl-3 md:pr-4 sm:pr-0"
                              >
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className=" max-h-96 overflow-y-auto">
                            <ChoosePlayers
                              index={index}
                              teams={teams}
                              open={open}
                              setOpen={setOpen}
                              setPlayerPositions={setPlayerPositions}
                              playerIds={playerPositions.map(
                                (player) => player.id
                              )}
                              slug={params.slug}
                            />
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 pb-32 flex flex-col items-center">
          <div className=" py-6 text-black text-2xl md:text-4xl font-bold text-center">
            Logs
          </div>
          {logs.length != 0 && <Logs logs={logs} />}
        </div>
      </div>
    </>
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
