"use client";

import { PropsWithChildren } from "react";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export const DynamicProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const evmNetworks = [
    {
      blockExplorerUrls: ["https://sepolia.arbiscan.io/"],
      chainId: 421614,
      chainName: "Arbitrum Sepolia",
      iconUrls: ["https://app.dynamic.xyz/assets/networks/arbitrum.svg"],
      name: "Arbitrum Sepolia",
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      networkId: 421614,
      rpcUrls: [
        `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_ARBITRUM}`,
      ],
      vanityName: "Arb Sepolia",
    },
  ];
  return (
    <DynamicContextProvider
      settings={{
        appLogoUrl: "https://app.luffyprotocol.com/logo.png",
        overrides: { evmNetworks },
        environmentId:
          process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID ||
          "2762a57b-faa4-41ce-9f16-abff9300e2c9",
        appName: "Luffy Protocol",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};
