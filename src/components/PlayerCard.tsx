import React from "react";
import { Pixelify_Sans } from "next/font/google";
import Image from "next/image";
const pxsans = Pixelify_Sans({ subsets: ["latin"] });
export default function CardImage({
  name,
  team,
  position,
  points,
}: {
  name: string;
  team: string;
  position: string;
  points: number;
}) {
  return (
    <>
      <div className="overflow-hidden rounded bg-white text-slate-500  w-52">
        <div className="flex items-center justify-center">
          <figure>
            <Image
              src={`/players/${team}/${position}.png`}
              alt="card image"
              objectFit="cover"
              width={100}
              height={100}
            />
          </figure>
        </div>
        <div className="p-6">
          <header className="">
            <h3 className="text-xl font-medium text-slate-700 text-center">
              {name}
            </h3>
            {/* <div className="flex justify-between"> */}
            <p
              className={`text-sm text-slate-400 text-center ${pxsans.className}`}
            >
              {team}
            </p>
            {/* <p className="text-sm text-slate-400">{position}</p> */}
            {/* </div> */}
            <p className="text-lg font-bold text-center">Points:{points}</p>
          </header>
        </div>
      </div>
    </>
  );
}
