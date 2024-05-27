import React from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
interface Props {
  close: () => void; // Define handleVerify prop as a function that takes no arguments and returns void
  balance: string;
}

const ErrorModal: React.FC<Props> = ({ close, balance }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full shadow-lg text-black">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={"/logo.png"}
            alt="Luffy Logo"
            width={100}
            height={100}
            className=" object-contain mb-4"
          />
          <h2 className="text-2xl font-bold mb-4">We are Sorry!</h2>
          <ul className="list-disc mb-6 text-lg text-center">
            <p className="mb-2">You have enough balance of {balance} ETH.</p>
            <p className="mb-2">
              Please claim free ETH when there is a need for it.
            </p>
          </ul>
          <button
            className="bg-[#01A4F1] text-white px-6 py-3 rounded-md shadow-sm hover:bg-indigo-500 transition-colors duration-300"
            onClick={() => close()}
          >
            Back to Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
