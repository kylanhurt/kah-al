import { createConfig, configureChains } from "wagmi";
import { avalancheFuji } from "@wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, publicClient } = configureChains(
  [avalancheFuji],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "QUICKNODE_HTTP_PROVIDER_URL", // 👈 Replace this with your HTTP URL from the previous step
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
