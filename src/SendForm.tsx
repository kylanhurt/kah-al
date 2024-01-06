import { useState } from "react";
import {
  usePrepareContractWrite,
  useSendTransaction as sendTransaction,
  useContractWrite,
} from "wagmi";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { isAddress, parseEther } from "viem";

export const SendForm = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const onChangeAmount = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!value) {
      return setAmount({ value, valid: false, invalid: false, feedback: "" });
    }
    setAmount({ ...amount, value, valid: true, invalid: false, feedback: "" });
  };

  const formattedAmount = (parseFloat(amount || "0") * 10 ** 6).toString();
  const result = usePrepareContractWrite({
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
  });

  console.log("result.error.shortMessage: ", result.error?.shortMessage);
  const { data, isLoading, isSuccess, write } = useContractWrite(result.config);

  const customSend = async () => {
    try {
      const response = await write?.();
      console.log("response: ", response);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const checkAmountError = () => {
    if (!amount) {
      return "Amount is required";
    }

    if (parseFloat(amount) > 1000000) {
      return "Amount must be less than 1,000,000";
    }
    return "";
  };

  return (
    <Form>
      <FormGroup>
        <Label for="recipientAddress">Recipient Address</Label>
        <Input
          type="text"
          name="recipientAddress"
          id="recipientAddress"
          placeholder="0x..."
          onChange={({ target: { value } }) => setRecipientAddress(value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="amount">Amount</Label>
        <InputGroup>
          <Input
            type="number"
            name="amount"
            id="amount"
            placeholder="1.000000"
            onChange={onChangeAmount}
            min={0}
          />
          <InputGroupText>USDC</InputGroupText>
        </InputGroup>
        <p className="error">
          {(recipientAddress || amount) &&
            (result.error?.shortMessage || checkAmountError())}
        </p>
      </FormGroup>
      <Button color="primary" disabled={false} onClick={customSend}>
        Send
      </Button>
    </Form>
  );
};
