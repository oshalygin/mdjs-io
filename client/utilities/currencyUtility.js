export function numberToLocaleString(number) {
  return `$ ${number.toLocaleString('en-US',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  )}`;
}

export function numberToLocaleStringWithoutDecimals(number) {
  return `$ ${number.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
}
