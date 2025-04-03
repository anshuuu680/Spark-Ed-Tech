import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},        
  isAuthenticated: false, 
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUserData, setIsAuthenticated } = userDataSlice.actions;

export const selectUserData = (state) => state.userData;
export const selectIsAuthenticated = (state) => state.userData.isAuthenticated;

export default userDataSlice.reducer;
