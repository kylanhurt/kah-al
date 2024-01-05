import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { config } from "./wagmi";

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
      <div className="justify-content-center align-items-center">
        <div className="text-center">
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
      <div className="">
        <p>Connecting...</p>
      </div>
    );
  }

  return (
    <div className="">
      <button className="btn btn-primary" onClick={() => connect()}>
        Connect Wallet
      </button>
    </div>
  );
};
