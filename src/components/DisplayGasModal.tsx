import React, { useEffect, useState } from "react";
import Image from "next/image";
import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, createWalletClient, http, parseEther } from "viem";
import { arbitrumSepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { SpinnerIcon } from "@dynamic-labs/sdk-react-core";
interface Props {
  state: boolean;
  setModalState: (state: boolean) => void;
}

const DisplayGasModal: React.FC<Props> = ({ state, setModalState }) => {
  const { address } = useAccount();
  const [txHash, setTxHash] = useState("");
  useEffect(() => {
    if (state && txHash == "") {
      (async function () {
        try {
          const account = privateKeyToAccount(
            (process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`) || "0x"
          );
          const walletClient = createWalletClient({
            account: account,
            chain: arbitrumSepolia,
            transport: http(
              `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ARBITRUM}`
            ),
          });
          const publicClient = createPublicClient({
            chain: arbitrumSepolia,
            transport: http(
              `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ARBITRUM}`
            ),
          });
          const txCount = await publicClient.getTransactionCount({
            address: account.address,
          });

          const tx = await walletClient.sendTransaction({
            account: account,
            to: address,
            value: parseEther("0.02"),
            nonce: txCount,
          });
          console.log("TX complete");
          console.log(tx);
          setTxHash(tx);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [state, txHash]);
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
          <h2 className="text-2xl font-bold mb-4">
            Please wait while we mint some funds to your wallet
          </h2>
          <ul className="list-disc mb-6 text-lg text-center">
            <p className="mb-2">
              You need some funds to perform the transaction.
            </p>
            <p className="mb-2">Minting 0.02ETH to your wallet now...</p>

            {txHash != "" && (
              <p>
                Click{" "}
                <a
                  target="_blank"
                  className="text-underline text-blue-400"
                  href={`https://sepolia.arbiscan.io/tx/${txHash}`}
                >
                  here
                </a>{" "}
                to view the transaction
              </p>
            )}
            <button
              onClick={() => {
                if (txHash != "") setModalState(false);
              }}
              className="mt-4 rounded-md bg-[#01A4F1] px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-neutral-400"
            >
              <div className="flex">
                <p>{txHash == "" ? "Processing.." : "Back to Game"}</p>&nbsp;
                {txHash == "" && <SpinnerIcon />}
              </div>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DisplayGasModal;
