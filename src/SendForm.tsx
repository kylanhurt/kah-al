import { useEffect, useState } from "react";
import {
  usePrepareContractWrite,
  useSendTransaction as sendTransaction,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransactionReceipt,
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
  const [recipientAddress, setRecipientAddress] = useState({
    value: "",
    valid: false,
    invalid: false,
    feedback: "",
  });
  const [amount, setAmount] = useState({
    value: "",
    valid: false,
    invalid: false,
    feedback: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const onChangeRecipientAddress = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (value) {
      const valid = isAddress(value);
      const invalid = !valid;
      const feedback = valid ? "" : "Invalid address";
      setRecipientAddress({ value, valid, invalid, feedback });
    } else {
      // if empty string
      setRecipientAddress({
        value,
        valid: false,
        invalid: false,
        feedback: "",
      });
    }
  };

  const onChangeAmount = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!value) {
      return setAmount({ value, valid: false, invalid: false, feedback: "" });
    }
    setAmount({ ...amount, value, valid: true, invalid: false, feedback: "" });
  };

  const isAmountValid = (amount: string) => {};

  const isFormValid = recipientAddress.valid && amount.valid;

  const formattedAmount = (amount.value * 10 ** 6).toString();
  console.log("formattedAmount: ", formattedAmount);
  const { config: txConfig } = usePrepareContractWrite({
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
    args: [recipientAddress.value, formattedAmount],
  });

  console.log("txConfig: ", txConfig);
  const { data, isLoading, isSuccess, write } = useContractWrite(txConfig);

  const customSend = async () => {
    try {
      const response = await write?.();
      console.log("response: ", response);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const fetchTxStatuses = async () => {};

  useEffect(() => {
    setInterval(fetchTxStatuses, 10000);
  }, []);

  return (
    <Form>
      <FormGroup>
        <Label for="recipientAddress">Recipient Address</Label>
        <Input
          type="text"
          name="recipientAddress"
          id="recipientAddress"
          placeholder="0x..."
          onChange={onChangeRecipientAddress}
          {...recipientAddress}
        />
        <FormFeedback {...recipientAddress}>
          {recipientAddress.feedback}
        </FormFeedback>
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
            {...amount}
            min={0}
          />
          <InputGroupText>USDC</InputGroupText>
        </InputGroup>
        <FormFeedback {...amount}>{amount.feedback}</FormFeedback>
      </FormGroup>
      <Button color="primary" disabled={!isFormValid} onClick={customSend}>
        Send
      </Button>
    </Form>
  );
};
