"use client";

import {
  WalletProvider as DappWalletProvider,
  SuiClientProvider,
  createNetworkConfig,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl("mainnet") },
  testnet: { url: getFullnodeUrl("testnet") },
});
const queryClient = new QueryClient();

export default function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={"testnet"}>
        <DappWalletProvider
          storage={{
            //@ts-ignore
            setItem: (name: string, value: string) => {
              return typeof window !== "undefined"
                ? window?.localStorage.setItem(name, value)
                : "";
            },
            getItem: (name: string) => {
              return typeof window !== "undefined"
                ? window?.localStorage.getItem(name)
                : "";
            },
            //@ts-ignore
            removeItem: (name: string) => {
              return typeof window !== "undefined"
                ? window?.localStorage.removeItem(name)
                : "";
            },
          }}
          autoConnect
        >
          {children}
        </DappWalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
