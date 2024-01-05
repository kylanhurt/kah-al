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
  });

  if (address) {
    return (
      <div>
        <div className="">
          <p>Connected to {address}</p>
          <p>Balance: {data ? data.formatted : "Loading..."} ETH</p>
          <p>Chain ID: {config ? config.lastUsedChainId : ""}</p>
          <button className="btn btn-primary mt-3" onClick={disconnect}>
            Disconnect
          </button>
        </div>
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
    <div className="connect-button">
      <Button color="primary" onClick={connect}>
        Connect Wallet
      </Button>
    </div>
  );
};
