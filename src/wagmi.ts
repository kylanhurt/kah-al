import { createConfig, configureChains } from "wagmi";
import { avalancheFuji } from "@wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, publicClient } = configureChains(
  [avalancheFuji],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://avalanche-fuji.drpc.org/",
        webSocket: "wss://avalanche-fuji.drpc.org/",
      }),
    }),
  ]
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
});
