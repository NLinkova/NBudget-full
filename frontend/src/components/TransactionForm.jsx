import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createTransaction,
  getTransactions,
  reset,
} from "../features/transactions/transactionSlice";
import TransactionItem from "../components/TransactionItem";
import Spinner from "../components/Spinner";

function TransactionForm() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getTransactions());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createTransaction({ text, amount }));
    setText("");
    setAmount("");
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="card-header py-3">
        <h6 className="text-primary fw-bold m-0">
          <div className="btn-group" role="group"></div>Transactions
        </h6>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fuel</td>
                <td>1400,00</td>
                <button className="btn btn-outline-info">x</button>
              </tr>
              {transactions.length > 0 ? (
                <>
                  {transactions.map((transaction) => (
                    <TransactionItem
                      key={transaction._id}
                      transaction={transaction}
                    />
                  ))}
                </>
              ) : (
                <p>You have not set any transactions</p>
              )}
              <tr></tr>
            </tbody>
          </table>
          <section className="form">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="text"
                  placeholder="transaction"
                  id="text"
                  value={text}
                  required
                  onChange={(e) => setText(e.target.value)}
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="amount"
                  id="amount"
                  pattern="[-]?[0-9]*[.,]?[0-9]+"
                  inputMode="decimal"
                  value={amount}
                  required
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Add Transaction
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TransactionForm;
