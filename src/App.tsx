import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WagmiConfig } from "wagmi";
import { config } from "./wagmi";
import { Connect } from "./Connect";
import { SendForm } from "./SendForm";

const Content = () => {
  // I put this address and connect functionality here
  // because I thought the SendForm component would need it passed down
  // but it turns out that isn't necessary, so much of this could be moved
  // into the Connect component
  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  // get user's balance of USDC
  // realistically you may want put make balance-fetching
  // on an interval so that it updates periodically
  const { data } = useBalance({
    address,
    token: "0x5425890298aed601595a70AB815c96711a31Bc65",
  });

  return (
    <>
      <Connect
        data={data}
        address={address}
        disconnect={disconnect}
        connect={connect}
      />
      <SendForm />
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
