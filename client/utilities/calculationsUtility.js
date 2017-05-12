export function percentDifference(firstValue, secondValue, decimalPlaces) {
  const difference = ((Math.abs(firstValue - secondValue)) / ((firstValue + secondValue) / 2)) * 100;
  return `${difference.toFixed(decimalPlaces)}%`;
}

export function percentageOf(numerator, total, decimalPlaces) {
  const percentage = ((numerator / total) * 100);
  return `${percentage.toFixed(decimalPlaces)}%`;
}
