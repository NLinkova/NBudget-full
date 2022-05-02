import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createGoal, getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";

function GoalForm() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text, amount }));
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
          <div className="btn-group" role="group"></div>Savings goals
        </h6>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Goal</th>
                <th>Amount</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Car</td>
                <td>1500,00</td>
                <button></button>
              </tr>
              {goals.length > 0 ? (
                <>
                  {goals.map((goal) => (
                    <GoalItem key={goal._id} goal={goal} />
                  ))}
                </>
              ) : (
                <p>You have not set any goals</p>
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
                  placeholder="goal"
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="amount"
                  id="amount"
                  // pattern="/^[0-9]+$/"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Add goal
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default GoalForm;
