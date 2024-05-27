import { useEffect, useState } from "react";
interface PlayerImageProps {
  name: string;
  index: number;
  player: Player;
  points: number[];
  showPoints: boolean;
  onClick: () => void;
}

interface Player {
  name: string;
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
export default function JustPlayerImage({
  player,
  point,
}: {
  player: Player;
  point: number;
}) {
  const [imageUrl, setImageUrl] = useState<string>(
    `/players/plain/${player.type}.png`
  );

  useEffect(() => {
    setImageUrl(`/players/${player.team}/${player.type}.png`);
  }, [player.team, player.type]);
  return (
    <div className="flex flex-col items-center">
      <img src={imageUrl} alt={`Top Scorer Player`} className={`w-16 mt-4`} />
      <p
        className={`font-bold text-xs mt-2 bg-slate-50 text-black rounded-md text-center`}
      >
        {player.name}
      </p>
      <div className="text-xs mt-1 bg-slate-50 text-black rounded-md">
        {point}
        {"  "}Points
      </div>
    </div>
  );
}
