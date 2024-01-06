import { useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
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
import { Transactions } from "./Transactions";

export const SendForm = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [txHashes, setTxHashes] = useState<string[]>([]);

  const preparedData = getPreparedContractWrite(recipientAddress, amount);
  const result = usePrepareContractWrite(preparedData);
  const { write, writeAsync, data, isLoading, isSuccess } = useContractWrite(
    result.config
  );

  const customSend = async () => {
    try {
      const { hash } = await writeAsync?.();
      if (hash) setTxHashes([hash, ...txHashes]);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  return (
    <>
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
            {isLoading && (
              <Spinner color="light" className="spinner" size="sm" />
            )}
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
      <br />
      <br />
      <div className="transactions-wrap">
        <Transactions hashes={txHashes} />
      </div>
    </>
  );
};
