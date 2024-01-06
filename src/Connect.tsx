import { Button } from "reactstrap";

type ConnectProps = {
  address?: string;
  data: any;
  disconnect: () => void;
  connect: () => void;
};

export const Connect = ({
  address,
  data,
  disconnect,
  connect,
}: ConnectProps) => {
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

  return (
    <div className="connect-button-wrap">
      <Button color="primary" onClick={connect}>
        Connect Wallet
      </Button>
    </div>
  );
};
