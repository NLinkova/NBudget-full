import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";
import transactionReducer from "../features/transactions/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    transactions: transactionReducer,
  },
});
