import {
  LightBulbIcon,
  PuzzlePieceIcon,
  GlobeAsiaAustraliaIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import Youtube from "./Youtube";

const features = [
  {
    name: "Build Your Dream Team",
    description:
      "Strategically select players based on rarity, type (batsman, bowler, all-rounder), and budget.",
    icon: LightBulbIcon,
  },
  {
    name: "Join the Perfect Contest",
    description:
      "Choose from various fantasy cricket contests with different entry fees, prize pools, and formats (T20, ODI, Test).",
    icon: PuzzlePieceIcon,
  },
  {
    name: "Witness Real-World Action Translate to Fantasy Points",
    description:
      "Runs scored, wickets taken, and catches made all contribute to your team's success.",
    icon: GlobeAsiaAustraliaIcon,
  },
  {
    name: "Climb the Leaderboard and Claim Your Rewards",
    description:
      "Compete with other users and see your team rise in the rankings based on accumulated points.",
    icon: TrophyIcon,
  },
];

export default function Example() {
  return (
    <div className="bg-slate-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#01A4F1]">
            Get Started
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How to play Luffy
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Play fantasy cricket with Luffy in the blockchain just like how you
            use your regular fantasy cricket app.
          </p>
        </div>
        <div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#01A4F1]">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex justify-center items-center">
            <Youtube />
          </div>
        </div>
      </div>
    </div>
  );
}
