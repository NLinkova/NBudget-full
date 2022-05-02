import React from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../features/transactions/transactionSlice";

function TransactionItem({ transaction }) {
  const dispatch = useDispatch();

  return (
    <>
      <tr>
        <td>{transaction.text}</td>
        <td>{transaction.amount}</td>
        <a
          onClick={() => dispatch(deleteTransaction(transaction._id))}
          className="close"
        ></a>
      </tr>
    </>
  );
}

export default TransactionItem;
