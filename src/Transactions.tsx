import { useWaitForTransaction } from "wagmi";
import { Table } from "reactstrap";
import { ellipsizeCenter } from "./utils";

export const Transaction = ({ hash }) => {
  const { data } = useWaitForTransaction({
    hash,
  });

  console.log("tx data", data);
  const colorClass =
    data?.status === "success" ? "success-message" : "pending-message";
  return (
    <tr>
      <td>{data?.blockNumber.toString()}</td>
      <td>{ellipsizeCenter(hash, 16)}</td>
      <td className={colorClass}>{data?.status || "pending"}</td>
    </tr>
  );
};

export const Transactions = ({ hashes }) => {
  console.log("hashes", hashes);
  return (
    <Table>
      <thead>
        <tr>
          <th>Block</th>
          <th>Hash</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {hashes.map((hash) => (
          <Transaction hash={hash} key={hash} />
        ))}
      </tbody>
    </Table>
  );
};
