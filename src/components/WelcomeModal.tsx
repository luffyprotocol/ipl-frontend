import React from "react";
import Image from "next/image";
interface Props {
  close: () => void; // Define handleVerify prop as a function that takes no arguments and returns void
  tx: string;
}

const WelcomeModal: React.FC<Props> = ({ close, tx }) => {
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
          <h2 className="text-2xl font-bold mb-4">Welcome to Luffy!</h2>
          <ul className="list-disc mb-6 text-lg text-center">
            <p className="mb-2">Thank you for trying out our application.</p>
            <p className="mb-2">
              We minted 0.002 ETH on Arbitrum Sepolia to your wallet to sponsor
              your transactions.
            </p>
            <p>
              Click{" "}
              <a
                target="_blank"
                className="text-underline text-blue-400"
                href={`https://sepolia.arbiscan.io/tx/${tx}`}
              >
                here
              </a>{" "}
              to view the transaction
            </p>
          </ul>
          <button
            className="bg-[#01A4F1] text-white px-6 py-3 rounded-md shadow-sm hover:bg-indigo-500 transition-colors duration-300"
            onClick={() => close()}
          >
            Play Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
