import { sendTransaction } from "@wagmi/core";
import { config } from "./wagmi";

export const sendTokens = async (to: any, value: any) => {
  const something = sendTransaction({
    request: {
      to,
      value: (value * 10 ** 6).toString(),
    },
    onSuccess: (tx: any) => console.log("success tx", tx),
  });
};
