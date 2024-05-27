import React from "react";
import Ankr from "../../public/Ankrverify.png";
import Image from "next/image";

interface Props {
  handleVerify: () => void; // Define handleVerify prop as a function that takes no arguments and returns void
}

const AnkrModal: React.FC<Props> = ({ handleVerify }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full shadow-lg text-black">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={Ankr}
            alt="Ankr Logo"
            className="w-full h-full object-contain mb-4"
          />
          <h2 className="text-2xl font-bold mb-4">Terms &amp; Conditions</h2>
          <ul className="list-disc mb-6 text-lg text-left">
            <li className="mb-2">
              This app is completely decentralized, we don&apos;t own your team
              data.
            </li>
            <li className="mb-2">We use Chainlink to generate scores.</li>
            <li>The user must be above 18 years to use this app.</li>
          </ul>
          <button
            className="bg-[#01A4F1] text-white px-6 py-3 rounded-md shadow-sm hover:bg-indigo-500 transition-colors duration-300"
            onClick={() => handleVerify()}
          >
            Verify with Ankr
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnkrModal;
