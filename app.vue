<script setup>
import BigNumber from 'bignumber.js';
import {nacistCasovacZLocalStorage, ulozitCasovacDoLocalStorage} from "~/utils/localStorage";
import ObrazekZlutehoDomu from "~/components/ObrazekZlutehoDomu.vue";
import FormularNovehoCasovace from "~/components/FormularNovehoCasovace.vue";
import UkazatelOdpoctu from "~/components/UkazatelOdpoctu.vue";
import HodinyOdpoctu from "~/components/HodinyOdpoctu.vue";

const jeFormularCasovaceOtevreny = ref(false);
// Celková délka časovače v sekundách tak, jak ji zadal uživatel.
const delkaCasovace = ref(new BigNumber(0));
// Časová značka v sekundách. Kdy byl časovač poprvé nastaven a spuštěn.
const prvniSpusteniCasovace = ref();
// Časová značka v sekundách. Kdy se má časovač spustit. Většinou teď hned.
const casSpusteni = ref(zkonvertujDatumNaSekundy(new Date()));

/**
 * @param {Date} datum
 * @returns {BigNumber}
 */
function zkonvertujDatumNaSekundy(datum) {
  return new BigNumber(datum.getTime()).div(1000).decimalPlaces(0, BigNumber.ROUND_FLOOR);
}

/**
 * Zobrazí formulář pro nastavení časovače.
 */
function otevriFormularCasovace() {
  jeFormularCasovaceOtevreny.value = true;
}

/**
 * Zavře formulář pro nastavení časovače.
 */
function zavriFormularCasovace() {
  jeFormularCasovaceOtevreny.value = false;
}

/**
 * Nastaví a spustí nový časovač.
 * @param {BigNumber} hodiny
 * @param {BigNumber} minuty
 * @param {BigNumber} sekundy
 */
function nastavCasovac(hodiny, minuty, sekundy) {
  let novaDelkaCasovace = new BigNumber(sekundy);
  novaDelkaCasovace = novaDelkaCasovace.plus(minuty.times(60));
  novaDelkaCasovace = novaDelkaCasovace.plus(hodiny.times(60 * 60));
  delkaCasovace.value = novaDelkaCasovace.decimalPlaces(0);

  const ted = zkonvertujDatumNaSekundy(new Date());
  prvniSpusteniCasovace.value = ted;
  casSpusteni.value = ted;

  ulozitCasovacDoLocalStorage(novaDelkaCasovace, ted);
}

/**
 * Načte predešlý časovač z lokálního úložiště.
 */
function nactiPredeslyCasovac() {
  const predeslyCasovac = nacistCasovacZLocalStorage();

  delkaCasovace.value = predeslyCasovac.totalTimerDuration;
  prvniSpusteniCasovace.value = predeslyCasovac.startTime;
  casSpusteni.value = zkonvertujDatumNaSekundy(new Date());
}

/**
 * Načte časovač ze souboru.
 */
function importovatCasovacZeSouboru() {
  nactiPredeslyCasovac()
}

// Načti předeslý časovač z lokálního úložiště a spusti odpočet. Stane se tak pouze při prvním načtení aplikace.
onMounted(() => {
  nactiPredeslyCasovac();
});
</script>

<template>
  <vite-pwa-manifest />

  <main class="container">
    <section class="picture" @click="otevriFormularCasovace">
      <obrazek-zluteho-domu />
    </section>
    <section class="timer">
      <div>
        <hodiny-odpoctu :delka-casovace="delkaCasovace" :prvni-spusteni-casovace="prvniSpusteniCasovace" :cas-spusteni="casSpusteni" />
      </div>
      <div>
        <ukazatel-odpoctu :delka-casovace="delkaCasovace" :prvni-spusteni-casovace="prvniSpusteniCasovace" :cas-spusteni="casSpusteni" />
      </div>
    </section>
  </main>

  <formular-noveho-casovace :otevrit="jeFormularCasovaceOtevreny" :pri-nastaveni-casovace="nastavCasovac" :pri-zavreni="zavriFormularCasovace" :pri-nacteni-ze-souboru="importovatCasovacZeSouboru" />
</template>

<style>
:root {
  --palette-background: #FFFFFF;
  --palette-primary: #35aaea;
  --palette-secondary: #d1a43c;
  --palette-font-default: #1f1f1f;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: var(--palette-background);
  color: var(--palette-font-default);
}

.container {
  height: 100vh;
  overflow: auto;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto min-content;
}

.picture {
  background: lightgray;
}

.timer {
  padding: 1rem;
  gap: 1rem;
  display: grid;
  align-items: center;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr;
}
@media (min-width: 600px) {
  .timer {
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr;
  }
}
</style>
