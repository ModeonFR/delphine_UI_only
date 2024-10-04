import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

export const login = createAsyncThunk(
    'login/get',
    async ({email, password}) => {
      const response = await userService.login({email, password});
      return response;
    }
  );


  const userSlice = createSlice({
    name: 'user',
    initialState: { status: 'idle', connected:false, login_try:0},
    extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
        state.status = 'loading';
      });
      builder.addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.connected = action.payload.result
        state.login_try += 1
      });
      builder.addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    },
  });
  


  export default userSlice.reducer;