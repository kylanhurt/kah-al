import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WagmiConfig } from "wagmi";
import { config } from "./wagmi";
import { Connect } from "./Connect";
import { SendForm } from "./SendForm";

const Content = () => {
  const { address } = useAccount();
  const { connect, isConnecting } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { data } = useBalance({
    address: address,
    token: "0x5425890298aed601595a70AB815c96711a31Bc65",
  });

  return (
    <>
      <Connect
        data={data}
        address={address}
        disconnect={disconnect}
        connect={connect}
        isConnecting={isConnecting}
      />
      <SendForm userData={data} />
    </>
  );
};

function App() {
  return (
    <WagmiConfig config={config}>
      <Content />
    </WagmiConfig>
  );
}

export default App;
