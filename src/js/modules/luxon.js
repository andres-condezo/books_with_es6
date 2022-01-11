import { DateTime } from 'luxon';
import { $ } from './utilities.js';

const $dateContainer = $('#date-container');

const showDate = () => {
  setInterval(() => {
    const dt = DateTime.now();
    $dateContainer.innerHTML = dt.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS).slice(0, -5);
  }, 1000);
};

export default showDate;
