import moment from "moment";
import { BPI } from "./models/bpi.model";
import { DailyPrice } from "./models/daily-price.model";

const api = "https://api.coindesk.com/v1/bpi/historical/close.json";

export const getPrices = async (period = 1): Promise<DailyPrice[]> => {
  const yesterday = moment().subtract(1, "day");
  const endDate = yesterday.format('YYYY-MM-DD');
  const startDate = yesterday.subtract(period, "months").format("YYYY-MM-DD");
  
  const response = await fetch(`${api}?start=${startDate}&end=${endDate}`);
  const result: BPI = await response.json();
  const keys: string[] = Object.keys(result.bpi);

  return keys.map((key: string) => ({ date: key, price: Math.floor(result.bpi[key]) }));
}
