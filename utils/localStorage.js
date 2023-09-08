import BigNumber from "bignumber.js";

const TIMER_DURATION_KEY = 'totalTimerDurationSeconds';
const START_TIMESTAMP_KEY = 'startTimestamp';

/**
 * Persist the current timer in local storage.
 * @param {BigNumber} totalTimerDuration In seconds.
 * @param {BigNumber} startTime Timestamp in seconds.
 */
export function saveTimerLocally(totalTimerDuration, startTime) {
  localStorage.setItem(TIMER_DURATION_KEY, totalTimerDuration.toString());
  localStorage.setItem(START_TIMESTAMP_KEY, startTime.toString());
}

/**
 * Load the last timer from local storage.
 * @returns {{startTime: BigNumber, totalTimerDuration: BigNumber}}
 */
export function loadTimerLocally() {
  return {
    totalTimerDuration: new BigNumber(localStorage.getItem(TIMER_DURATION_KEY) ?? 0),
    startTime: new BigNumber(localStorage.getItem(START_TIMESTAMP_KEY) ?? 0)
  };
}
