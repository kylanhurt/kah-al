import { useEffect } from "react";
import { Button } from "reactstrap";
import { walletClient } from "./client";

export const Connect = () => {
  const getAddress = async () => {
    const [address] = await walletClient.getAddresses();
    console.log("address: ", address);
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div className="connect-btn-wrap">
      <Button color="secondary">Connect wallet</Button>
    </div>
  );
};
