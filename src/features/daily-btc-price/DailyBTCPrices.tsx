import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPricesForPeriod, selectPeriod, selectPrices, selectStatus } from "./daily-btc-prices.slice";
import { countPrimeDigits, isPrime } from "./utilities/prime-numbers";
import styles from './DailyBTCPrices.module.css';

export const DailyBTCPrices = () => {
  const period = useAppSelector(selectPeriod);
  const dailyPrices = useAppSelector(selectPrices);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPricesForPeriod(period))
  }, []);

  const minPeriod = 1;
  const maxPeriod = 6;

  const renderSelectOptions = () => {
    const arr = new Array(maxPeriod).fill(null);
    return arr.map((_, idx: number) => {
      return (
        <option key={idx} value={idx + 1}>{idx + 1} Month{idx === 0 ? "" : "s"}</option>
      );
    });
  }

  const renderPrimePrices = () => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });

    if (status === "loading") {
      return <tr><td>Loading Prices...</td></tr>
    } else {
      return dailyPrices.filter(dailyPrice => {
        const totalPrimeDigits = countPrimeDigits(dailyPrice.price);
        return isPrime(totalPrimeDigits);
      }).map((dailyPrice) => {
        const totalPrimeDigits = countPrimeDigits(dailyPrice.price);
        return (
          <tr key={dailyPrice.date}>
            <td>{dailyPrice.date}</td>
            <td>{formatter.format(dailyPrice.price)}</td>
            <td>{totalPrimeDigits}</td>
          </tr>
        );
      });
    }
  };

  const handlePeriodChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    dispatch(getPricesForPeriod(+event.target.value));
  };

  return (
    <div>
      <h2 className={styles.heading}>Daily Bitcoin prices for the past{period === 1 ? "": (" " + period)} month{period > 1 ? "s" : ""}</h2>

      <label>Period: </label>
      <select className={styles.select} value={period} onChange={(e) => handlePeriodChange(e)}>
        {renderSelectOptions()}
      </select>

      <br />
      <i>The below table only shows daily bitcoin prices for the days on which the total number of prime numbers in a price (TNPNP) was a prime number itself.</i>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th title="Closing Price">Price</th>
            <th title="Total Number of Prime Numbers in Price">TNPNP</th>
          </tr>
        </thead>
        <tbody>
          {renderPrimePrices()}
        </tbody>
      </table>
    </div>
  );
}
