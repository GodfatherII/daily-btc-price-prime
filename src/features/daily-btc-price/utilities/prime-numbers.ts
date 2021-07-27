export const isPrime = (num: number) => {
  if (num <= 3) return num > 1;
  if ((num % 2 === 0) || (num % 3 === 0)) return false;

  let count = 5;
  while (Math.pow(count, 2) <= num) {
    if (num % count === 0 || num % (count + 2) === 0) return false;
    count += 6;
  }
  return true;
}

export const countPrimeDigits = (num: number) => {
  let remainingDigits = Math.floor(num), count = 0;
  while (remainingDigits != 0) {
    const digit = remainingDigits % 10;
    if (isPrime(digit)) count++;

    remainingDigits = Math.floor(remainingDigits / 10);
  }
  return count;
}
