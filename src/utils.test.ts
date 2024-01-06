import { ellipsizeCenter, getPreparedContractWrite } from "./utils";

describe("ellipsizeCenter", () => {
  it("returns the original string if it's shorter than the max length", () => {
    expect(ellipsizeCenter("abc", 5)).toEqual("abc");
  });

  it("returns the original string if it's equal to the max length", () => {
    expect(ellipsizeCenter("abcde", 5)).toEqual("abcde");
  });

  it("returns ellipsized string if string longer than max length", () => {
    expect(ellipsizeCenter("abcdefghijklmno", 8)).toEqual("abc...mno");
  });
});

describe("getPreparedContractWrite", () => {
  it("returns the correct object", () => {
    expect(getPreparedContractWrite("0x123", "1")).toEqual({
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
      args: ["0x123", "1000000"],
    });
  });
});
