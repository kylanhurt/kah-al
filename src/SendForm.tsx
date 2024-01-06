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
import { getPreparedContractWrite } from "./utils";

export const SendForm = ({ userData }) => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const preparedData = getPreparedContractWrite(recipientAddress, amount);
  const result = usePrepareContractWrite(preparedData);
  const { data, isLoading, isSuccess, write } = useContractWrite(result.config);

  const customSend = async () => {
    try {
      const response = await write?.();
      console.log("response: ", response);
    } catch (err) {
      console.log("error: ", err);
    }
  };
  console.log("userData: ", userData);
  const checkAmountError = () => {
    if (!amount) {
      return "Amount is required";
    }

    if (parseFloat(amount) > parseFloat(userData?.formatted)) {
      return "Insufficient USDC balance";
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
            onChange={({ target: { value } }) => setAmount(value)}
            min={0}
          />
          <InputGroupText>USDC</InputGroupText>
        </InputGroup>
        <p className="error">
          {(recipientAddress || amount) && result.error?.shortMessage}
        </p>
      </FormGroup>
      <Button
        color="primary"
        disabled={!userData || result.error}
        onClick={customSend}
      >
        Send
      </Button>
    </Form>
  );
};
