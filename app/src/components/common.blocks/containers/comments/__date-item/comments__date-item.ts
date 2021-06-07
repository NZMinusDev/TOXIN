import { diffDate, MS_IN_DAY } from '@utils/devTools/scripts/DateHelper';

document.querySelectorAll('.comments__date-item time').forEach((dateHTMLItem) => {
  // eslint-disable-next-line no-param-reassign
  dateHTMLItem.textContent = `${Math.abs(
    diffDate(new Date(), new Date(dateHTMLItem.getAttribute('datetime') as string)) / MS_IN_DAY
  ).toFixed(0)} дней назад`;
});
