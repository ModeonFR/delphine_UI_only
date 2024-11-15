import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import dataService from "../services/dataService";

export const search = createAsyncThunk(
    'search/get',
    async ({query, filters}) => {
      const response = await dataService.search({query, filters});
      return response;
    }
  );

  export const searchInvestor = createAsyncThunk(
    'search_investor/get',
    async ({query, filters}) => {
      const response = await dataService.searchInvestor({query, filters});
      return response;
    }
  );
  
  export const searchDeal = createAsyncThunk(
    'search_deal/get',
    async ({query, filters}) => {
      const response = await dataService.searchDeal({query, filters});
      return response;
    }
  );
    

  const dataSlice = createSlice({
    name: 'data',
    initialState: { status: 'idle', data:[], data_investors:[], data_deals:[], page:0, max_page:0 },
    reducers: {
      incrementPage: (state) => {
        if (state.page < state.max_page) {
          state.page += 1;
        }
      },
      decrementPage: (state) => {
        if (state.page > 0) {
          state.page -= 1;
        }
      }
    },
    extraReducers: (builder) => {
      builder.addCase(search.pending, (state) => {
        state.status = 'loading';
      });
      builder.addCase(search.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.page = action.payload.page
        state.max_page = action.payload.max_page
        state.status = 'succeeded';
      });
      builder.addCase(search.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      builder.addCase(searchInvestor.pending, (state) => {
        state.status = 'loading';
      });
      builder.addCase(searchInvestor.fulfilled, (state, action) => {
        state.data_investors = action.payload.data
        state.page = action.payload.page
        state.max_page = action.payload.max_page
        state.status = 'succeeded';
      });
      builder.addCase(searchInvestor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      builder.addCase(searchDeal.pending, (state) => {
        state.status = 'loading';
      });
      builder.addCase(searchDeal.fulfilled, (state, action) => {
        state.data_deals = action.payload.data
        state.page = action.payload.page
        state.max_page = action.payload.max_page
        state.status = 'succeeded';
      });
      builder.addCase(searchDeal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    },
  });
  

  export const { incrementPage, decrementPage } = dataSlice.actions;
  export default dataSlice.reducer;