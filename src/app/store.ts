import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dailyPricesReducer from '../features/daily-btc-price/daily-btc-prices.slice';

export const store = configureStore({
  reducer: {
    dailyPrices: dailyPricesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
