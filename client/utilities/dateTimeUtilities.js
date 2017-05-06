import dateFns from 'date-fns';

export function getLastNumberOfMonthsArray(numberOfMonths) {
  const currentDate = new Date();
  const currentMonthValue = dateFns.getMonth(currentDate);
  
  let months = [];
  for (let iterator = 0; iterator < numberOfMonths; iterator = iterator + 1) {

    const monthValue = (currentMonthValue - iterator) >= 0 ?
      (currentMonthValue - iterator) :
      12 + (currentMonthValue - iterator);

    const yearValue = (currentMonthValue - iterator) >= 0 ?
      dateFns.getYear(currentDate) :
      dateFns.getYear(currentDate) - 1;

    const month = {
      displayName: dateFns.format(new Date(yearValue, monthValue, 1), 'MMM'),
      monthValue,
      monthDisplayValue: monthValue + 1,
      year: yearValue
    };

    months = [...months, month];
  }

  return months;

}
