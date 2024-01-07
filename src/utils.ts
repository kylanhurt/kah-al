export const getPreparedContractWrite = (
  recipientAddress: string,
  amount: string
) => {
  // would be better to use BigInt for number formatting
  const formattedAmount = (parseFloat(amount || "0") * 10 ** 6).toString();

  return {
    address: "0x5425890298aed601595a70AB815c96711a31Bc65",
    abi: [
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "success", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "transfer",
    args: [recipientAddress, formattedAmount],
  };
};

export const ellipsizeCenter = (str: string, maxLen: number) => {
  if (str.length <= maxLen) return str;
  const leftHalf = str.slice(0, maxLen / 2 - 1);
  const rightHalf = str.slice(str.length - maxLen / 2 + 1);
  return `${leftHalf}...${rightHalf}`;
};
