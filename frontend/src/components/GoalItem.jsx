import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  return (
    <>
      <tr>
        <td>{goal.text}</td>
        <td>{goal.amount}</td>
        <button
          onClick={() => dispatch(deleteGoal(goal._id))}
          className="btn btn-outline-info"
        >
          x
        </button>
      </tr>
    </>
  );
}

export default GoalItem;
