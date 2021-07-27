import { DailyPrice } from "./daily-price.model";

export interface DailyPricesState {
  period: number;
  dailyPrices: DailyPrice[];
  status: 'idle' | 'loading' | 'failed';
}
