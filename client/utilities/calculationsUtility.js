export function percentDifference(firstValue, secondValue, decimalPlaces) {
  
  if (!firstValue && !secondValue) {
    return '0%';
  }

  const difference = ((Math.abs(firstValue - secondValue)) / ((firstValue + secondValue) / 2)) * 100;
  return `${difference.toFixed(decimalPlaces)}%`;
}

export function percentageOf(numerator, total, decimalPlaces) {
  
  if (!total) {
    return '0%';
  }

  const percentage = ((numerator / total) * 100);
  return `${percentage.toFixed(decimalPlaces)}%`;
}
