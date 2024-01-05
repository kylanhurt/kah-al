import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { config } from "./wagmi";
import { Button } from "reactstrap";

export const Connect = () => {
  const { address } = useAccount();
  const { connect, isConnecting } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { data, isError, isLoading } = useBalance({
    address: address,
    token: "0x5425890298aed601595a70AB815c96711a31Bc65",
  });

  if (address) {
    const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-6)}`;
    return (
      <div className="connect-button-wrap">
        <p>Balance: {data ? data.formatted : "Loading..."} USDC</p>
        <Button color="secondary" onClick={disconnect}>
          {truncatedAddress}
        </Button>
      </div>
    );
  }

  if (isConnecting) {
    return (
      <div>
        <p>Connecting...</p>
      </div>
    );
  }

  return (
    <div className="connect-button-wrap">
      <Button color="primary" onClick={connect}>
        Connect Wallet
      </Button>
    </div>
  );
};
