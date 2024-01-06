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
  InputGroup,
  InputGroupText,
  Spinner,
  Alert,
} from "reactstrap";
import { ellipsizeCenter, getPreparedContractWrite } from "./utils";

export const SendForm = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const preparedData = getPreparedContractWrite(recipientAddress, amount);
  const result = usePrepareContractWrite(preparedData);
  const {
    write,
    data, // hash, wait
    error,
    isLoading,
    isError,
    isSuccess,
  } = useContractWrite(result.config);

  const customSend = () => {
    try {
      const response = write?.();
      console.log("response: ", response);
      if (isSuccess) {
        console.log("is succes now");
      }
    } catch (err) {
      console.log("error: ", err);
    }
  };

  console.log(
    "isLoading: ",
    isLoading,
    "isError: ",
    isError,
    "isSuccess: ",
    isSuccess,
    "error: ",
    error,
    "data: ",
    data
  );

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
      <div className="submitWrap">
        <Button
          color="primary"
          disabled={!write || isLoading}
          onClick={customSend}
        >
          &nbsp;Send&nbsp;
          {isLoading && <Spinner color="light" className="spinner" size="sm" />}
        </Button>
      </div>
      <br />
      <br />
      {isSuccess && (
        <Alert color="success" className="alert">
          Tx success: {ellipsizeCenter(data?.hash, 16)}
        </Alert>
      )}
    </Form>
  );
};
