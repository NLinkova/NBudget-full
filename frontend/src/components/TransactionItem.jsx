import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../features/transactions/transactionSlice";

function TransactionItem({ transaction }) {
  const dispatch = useDispatch();
  return (
    <>
      <tr>
        <td>{transaction.text}</td>
        <td>{transaction.amount}</td>
        <td>
          <button
            onClick={() => dispatch(deleteTransaction(transaction._id))}
            className="btn btn-outline-info"
          >
            x
          </button>
        </td>
      </tr>
    </>
  );
}

export default TransactionItem;
