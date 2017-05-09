export function percentDifference(firstValue, secondValue, decimalPlaces) {
  const difference = ((Math.abs(firstValue - secondValue)) / ((firstValue + secondValue) / 2)) * 100;
  return `${difference.toFixed(decimalPlaces)}%`;
}
