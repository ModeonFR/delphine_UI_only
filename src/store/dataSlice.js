import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import dataService from "../services/dataService";

export const search = createAsyncThunk(
    'search/get',
    async ({query, filters}) => {
      const response = await dataService.search({query, filters});
      return response;
    }
  );


  const dataSlice = createSlice({
    name: 'data',
    initialState: { status: 'idle', data:[] },
    extraReducers: (builder) => {
      builder.addCase(search.pending, (state) => {
        state.status = 'loading';
      });
      builder.addCase(search.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.status = 'succeeded';
      });
      builder.addCase(search.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    },
  });
  


  export default dataSlice.reducer;