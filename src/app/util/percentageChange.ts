export function percentageChange(dividend: number, divisor: number): number {
  if (divisor === 0) {
    return dividend > 0 ? 100 : 0;
  }

  const percentage = (dividend / divisor) * 100 - 100;
  const roundedPercentage = Math.floor(percentage);

  return roundedPercentage;
}
