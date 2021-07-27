import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getPrices } from './btc-daily-prices.service';
import { DailyPricesState } from './models/daily-prices-state.model';

const initialState: DailyPricesState = {
  period: 1,
  dailyPrices: [],
  status: 'idle',
};

export const getPricesForPeriod = createAsyncThunk(
  'Get Prices From API',
  async (period: number) => {
    const response = await getPrices(period);
    return { prices: response, period: period };
  }
);

export const dailyPricesSlice = createSlice({
  name: 'daily-prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPricesForPeriod.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPricesForPeriod.fulfilled, (state, action) => {
        state.status = 'idle';
        state.dailyPrices = action.payload.prices;
        state.period = action.payload.period;
      });
  },
});

export const selectPeriod = (state: RootState) => state.dailyPrices.period;
export const selectPrices = (state: RootState) => state.dailyPrices.dailyPrices;
export const selectStatus = (state: RootState) => state.dailyPrices.status;

export default dailyPricesSlice.reducer;
