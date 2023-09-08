import BigNumber from "bignumber.js";

const TIMER_DURATION_KEY = 'totalTimerDurationSeconds';
const START_TIMESTAMP_KEY = 'startTimestamp';
const TIMER_FILE_NAME = 'danovi-hodiny';

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

/**
 * Export the current timer to a file. Can be saved locally and imported later.
 */
export function saveTimerInFile() {
  const data = new Blob([JSON.stringify(loadTimerLocally())], {type: 'application/json'});
  const url = URL.createObjectURL(data);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${TIMER_FILE_NAME}.json`;
  link.click();

  URL.revokeObjectURL(link.href);
}

/**
 * Load timer from a file and save it in local storage.
 * @param {File} file
 * @returns {Promise<void>}
 */
export async function loadTimerFromFile(file) {
  const fileContent = await file.text();
  const {totalTimerDuration, startTime} = JSON.parse(fileContent);

  saveTimerLocally(new BigNumber(totalTimerDuration), new BigNumber(startTime));
}
