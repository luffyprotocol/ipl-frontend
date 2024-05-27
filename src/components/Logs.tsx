import { useEffect } from "react";

const statuses = {
  Complete: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
};
const log = [
  {
    id: 1,
    hash: "0x71fe8de5a7d5f3e1e3b7b",
    href: "#",
    status: "Complete",
    username: "Romario",
  },
  {
    id: 2,
    hash: "0x71fe8de5a7d5f3e1e3b7b",
    href: "#",
    status: "In progress",
    username: "Leo",
  },
  {
    id: 3,
    hash: "0x71fe8de5a7d5f3e1e3b7b",
    href: "#",
    status: "In progress",
    username: "Gab",
  },
  {
    id: 4,
    hash: "0x71fe8de5a7d5f3e1e3b7b",
    href: "#",
    status: "In progress",
    username: "Maradona",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Logs({ logs }: { logs: any }) {
  useEffect(() => {
    console.log(logs);
  }, []);
  return (
    <div role="list" className="divide-y divide-gray-100 max-w-[90%]">
      {logs.map((lg: any) => (
        <div
          key={lg.id}
          className="flex items-center justify-between py-5 text-center mx-auto"
        >
          <div className="max-w-screen  ">
            <div className="flex items-start">
              <p className="text-sm font-semibold leading-6 text-gray-900 mx-auto md:mx-0 whitespace-normal text-wrap break-all">
                {lg.hash}
              </p>
            </div>
            <div className="mt-1 flex items-center text-xs leading-5 text-gray-500 ">
              <p className="mx-auto md:mx-0 whitespace-normal text-wrap break-all">
                {lg.username}
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            {lg.href.length > 0 && (
              <a
                href={lg.href}
                target="_blank"
                className="hidden md:block mx-0 md:ml-16 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
              >
                View Transaction<span className="sr-only">, {lg.username}</span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
