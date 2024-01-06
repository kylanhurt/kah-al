import { Button } from "reactstrap";

export const Connect = ({ address, data, disconnect, isConnecting }) => {
  if (address) {
    const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-6)}`;
    console.log("account data: ", data);
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
