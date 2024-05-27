"use client";

import {
  Dispatch,
  Fragment,
  SetStateAction,
  use,
  useEffect,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { csk, rcb, rr, kkr, dc, pbks, lsg, gt, srh, mi } from "@/data/teams";
import fetchMatchDetail from "@/utils/supabaseFunctions/fetchMatchDetails";
import { useAccount } from "wagmi";
import { useSearchParams } from "next/navigation";
import { allTeams, fixtureDetails } from "@/utils/constants";
interface PlayerPitch {
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
interface ChoosePlayerProps {
  index: number;
  teams: string[];
  open: boolean;
  playerIds: string[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setPlayerPositions: Dispatch<SetStateAction<PlayerPitch[]>>;
  slug: string;
}

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

const ChoosePlayers: React.FC<ChoosePlayerProps> = ({
  open,
  teams,
  index,
  setPlayerPositions,
  playerIds,
  setOpen,
  slug,
}) => {
  const [team, setteams] = useState<string[]>([
    teamShortForms[fixtureDetails[slug].team1].toLowerCase(),
    teamShortForms[fixtureDetails[slug].team2].toLowerCase(),
  ]);

  useEffect(() => {
    const fetchTeams = async () => {
      const { message, response } = await fetchMatchDetail(slug);

      if (message === "Success") {
        setteams([
          teamShortForms[response[0].team1].toLowerCase(),
          teamShortForms[response[0].team2].toLowerCase(),
        ]);
      }
    };
    fetchTeams();
  }, []);

  // const team = ["mi", "csk"];
  interface Player {
    id?: string;
    name: string;
    captain?: boolean;
    role?: string;
    imageId?: number;
    battingStyle?: string;
    bowlingStyle?: string;
    team?: string;
  }
  const [role, setRole] = useState("");
  const [player, setPlayer] = useState<Player[]>([]); // Fix the missing 'Player' type

  useEffect(() => {
    console.log(team);
    if (index === 10) {
      const team1 = allTeams[team[0] as keyof typeof allTeams];
      const team2 = allTeams[team[1] as keyof typeof allTeams];
      setPlayer([
        ...team1.player
          .filter((player) => player.role === "WK-Batter")
          .map(
            (player) => ({ ...player, team: team[0] }) // Set team for players from team1
          ),
        ...team2.player
          .filter((player) => player.role === "WK-Batter")
          .map(
            (player) => ({ ...player, team: team[1] }) // Set team for players from team2
          ),
      ]);
      setRole("Wicket Keeper");
    } else if (index >= 6) {
      const team1 = allTeams[team[0] as keyof typeof allTeams];
      const team2 = allTeams[team[1] as keyof typeof allTeams];
      setPlayer([
        ...team1.player
          .filter((player) => player.role?.includes("Allrounder"))
          .map(
            (player) => ({ ...player, team: team[0] }) // Set team for players from team1
          ),
        ...team2.player
          .filter((player) => player.role?.includes("Allrounder"))
          .map(
            (player) => ({ ...player, team: team[1] }) // Set team for players from team2
          ),
      ]);
      setRole("All Rounder");
    } else if (index >= 3) {
      const team1 = allTeams[team[0] as keyof typeof allTeams];
      const team2 = allTeams[team[1] as keyof typeof allTeams];
      setPlayer([
        ...team1.player
          .filter((player) => player.role === "Bowler")
          .map(
            (player) => ({ ...player, team: team[0] }) // Set team for players from team1
          ),
        ...team2.player
          .filter((player) => player.role === "Bowler")
          .map(
            (player) => ({ ...player, team: team[1] }) // Set team for players from team2
          ),
      ]);
      setRole("Bowler");
    } else {
      const team1 = allTeams[team[0] as keyof typeof allTeams];
      const team2 = allTeams[team[1] as keyof typeof allTeams];
      setPlayer([
        ...team1.player
          .filter((player) => player.role?.includes("Batter"))
          .map(
            (player) => ({ ...player, team: team[0] }) // Set team for players from team1
          ),
        ...team2.player
          .filter((player) => player.role?.includes("Batter"))
          .map(
            (player) => ({ ...player, team: team[1] }) // Set team for players from team2
          ),
      ]);
      setRole("Batsman");
    }
  }, [index]);
  const updatePlayerPosition = (index: number, newPlayerData: PlayerPitch) => {
    setPlayerPositions((prevPositions: any) => {
      // Create a copy of the state to avoid mutation
      const updatedPositions = [...prevPositions];

      // Ensure the index is within valid bounds
      if (index >= 0 && index < updatedPositions.length) {
        updatedPositions[index] = newPlayerData; // Replace the entire player entry
      } else {
        console.error(`Invalid index: ${index}`);
      }

      return updatedPositions;
    });
  };

  const renderImage = (index: any) => {
    return (
      <img
        className="h-11 w-11 rounded-full"
        src={
          `https://i.cricketcb.com/stats/img/faceImages/${index}.jpg` ||
          "/default.png"
        }
        alt=""
      />
    );
  };

  return (
    <>
      {player.map((person) => (
        <tr key={person.id}>
          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div className="flex items-center">
              <div className="h-11 w-11 flex-shrink-0">
                {/* <img
              className="h-11 w-11 rounded-full"
              src={
                playerImages[index] || "/default.png"
              }
              alt=""
            /> */}
                {renderImage(person.id)}
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">{person.name}</div>
              </div>
            </div>
          </td>
          <td className="whitespace-nowrap md:px-3 py-5 text-sm text-gray-500">
            <div className="text-gray-900">
              {/* {person.team} */}
              {person.team?.toUpperCase()}
            </div>
          </td>
          <td className="hidden md:block whitespace-nowrap md:px-3 py-5 text-sm text-gray-500">
            {role}
          </td>
          <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-2 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-neutral-400"
                disabled={playerIds.includes(person.id as any)}
                onClick={() => {
                  console.log(person);

                  updatePlayerPosition(index, {
                    id: person.id as any,
                    name: person.name,
                    team: person.team as any,
                    type: person.role as any,
                  });
                  setOpen(false);
                }}
              >
                Add Player
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
export default ChoosePlayers;
