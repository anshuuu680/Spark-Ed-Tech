import { configureStore } from '@reduxjs/toolkit';
import userDataSlice from "../Features/userDetails.jsx";

export const store = configureStore({
  reducer: {
    userData: userDataSlice,
  },
});

