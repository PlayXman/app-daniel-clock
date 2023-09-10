import BigNumber from "bignumber.js";

// Název klíče, pod kterým se ukládá časovač do local storage.
const KLIC_DELKY_CASOVACE = 'totalTimerDurationSeconds';
// Naév klíče, pod kterým se ukládá čas, kdy byl časovač poprvé spuštěn.
const KLIC_ZACATKU_ODPOCTU = 'startTimestamp';
// Jak se má jmenovat soubor, do kterého se exportuje časovač.
const ZAKLADNI_JMENO_EXPORTOVANEHO_SOUBORU = 'danovi-hodiny';

/**
 * Uloží časovač a jeho první spuštění do local storage.
 * @param {BigNumber} delkaCasovace V sekundách.
 * @param {BigNumber} prvniSpusteniCasovace "Timestamp" (časová značka) v sekundách.
 */
export function ulozitCasovacDoLocalStorage(delkaCasovace, prvniSpusteniCasovace) {
  localStorage.setItem(KLIC_DELKY_CASOVACE, delkaCasovace.toString());
  localStorage.setItem(KLIC_ZACATKU_ODPOCTU, prvniSpusteniCasovace.toString());
}

/**
 * Načte naposledy uložený časovač z local storage.
 * @returns {{startTime: BigNumber, totalTimerDuration: BigNumber}}
 */
export function nacistCasovacZLocalStorage() {
  return {
    totalTimerDuration: new BigNumber(localStorage.getItem(KLIC_DELKY_CASOVACE) ?? 0),
    startTime: new BigNumber(localStorage.getItem(KLIC_ZACATKU_ODPOCTU) ?? 0)
  };
}

/**
 * Exportuje actualní časovač do souboru. Lze uložit lokálně a později importovat.
 */
export function exportovatCasovacDoSouboru() {
  const data = new Blob([JSON.stringify(nacistCasovacZLocalStorage())], {type: 'application/json'});
  const url = URL.createObjectURL(data);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${ZAKLADNI_JMENO_EXPORTOVANEHO_SOUBORU}.json`;
  link.click();

  URL.revokeObjectURL(link.href);
}

/**
 * Načte časovač ze souboru a uloží ho do local storage.
 * @param {File} soubor
 * @returns {Promise<void>}
 */
export async function importovatCasovacZeSouboru(soubor) {
  const fileContent = await soubor.text();
  const {totalTimerDuration, startTime} = JSON.parse(fileContent);

  ulozitCasovacDoLocalStorage(new BigNumber(totalTimerDuration), new BigNumber(startTime));
}
