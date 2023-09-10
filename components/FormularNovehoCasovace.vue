<script setup>
import BigNumber from 'bignumber.js';
import {exportovatCasovacDoSouboru, importovatCasovacZeSouboru} from "~/utils/localStorage";

const props = defineProps({
  otevrit: {
    type: Boolean,
    required: true,
  },
  priNastaveniCasovace: {
    type: Function,
    required: true,
  },
  priZavreni: {
    type: Function,
    required: true,
  },
  priNacteniZeSouboru: {
    type: Function,
    required: true,
  },
});

const hodiny = ref("0");
const minuty = ref("0");
const sekundy = ref("0");

/**
 * Nastaví a spustí nový časovač při stisku tlačítka "Start".
 * @param udalost
 */
function priSpusteniNovehoCasovace(udalost) {
  udalost.preventDefault();

  props.priZavreni();

  props.priNastaveniCasovace(new BigNumber(hodiny.value), new BigNumber(minuty.value), new BigNumber(sekundy.value));
}

/**
 * Exportuje lokálně uložený časovač do souboru.
 * @param udalost
 */
function priExportuCasovace(udalost) {
  udalost.preventDefault();
  exportovatCasovacDoSouboru();
}

/**
 * Načte časovač ze souboru a uloží ho do lokálního úložiště.
 * @param udalost
 * @returns {Promise<void>}
 */
async function priNacteniZeSouboru(udalost) {
  udalost.preventDefault();

  await importovatCasovacZeSouboru(udalost.target.files[0]);

  props.priZavreni();
  props.priNacteniZeSouboru();
}
</script>

<template>
  <dialog v-show="otevrit" class="setTimerDialog">
    <form @submit="priSpusteniNovehoCasovace" class="setTimerDialog__content">
      <h3>Nastavit nový odpočet</h3>
      <div class="setTimerDialog__fields">
        <div>
          <label for="hodiny">Hodiny</label>
          <input id="hodiny" type="number" min="0" :value="hodiny" @input="hodiny = $event.target.value || '0'">
        </div>

        <div>
          <label for="minuty">Minuty</label>
          <input id="minuty" type="number" min="0" :value="minuty" @input="minuty = $event.target.value || '0'">
        </div>

        <div>
          <label for="sekundy">Sekundy</label>
          <input id="sekundy" type="number" min="0" :value="sekundy" @input="sekundy = $event.target.value || '0'">
        </div>
      </div>

      <h3>Nahrát nebo uložit odpočet</h3>
      <div class="setTimerDialog__saveLoad-content">
        <div>
          <h4>Uložit aktuální odpočet</h4>
          <button @click="priExportuCasovace">Stáhnout soubor</button>
        </div>
        <div>
          <h4>Nahrát uložený odpočet</h4>
          <input type="file" accept=".json" @input="priNacteniZeSouboru">
        </div>
      </div>

      <div class="setTimerDialog__submitCell">
        <input type="submit" value="Start">
      </div>
    </form>

    <div class="setTimerDialog__backdrop" @click="priZavreni" />
  </dialog>
</template>

<style>
.setTimerDialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.setTimerDialog__backdrop {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
}

.setTimerDialog__content {
  background: var(--palette-background);
  padding: 1rem;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.25);
  z-index: 1;
  margin: 1rem;
}

.setTimerDialog__fields {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.setTimerDialog__fields > * {
  flex-grow: 1;
}

.setTimerDialog__fields label {
  display: block;
  margin-bottom: 0.5rem;
}

.setTimerDialog__fields input {
  border: 1px solid var(--palette-font-default);
  padding: 0.5rem;
  width: 100%;
}

.setTimerDialog__saveLoad-content {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}
.setTimerDialog__saveLoad-content > * {
  flex-grow: 1;
  flex-basis: 14rem;
  background: #eee;
  padding: 0 1rem 1rem;
}

.setTimerDialog__submitCell {
  text-align: center;
  grid-column: 1 / -1;
}

.setTimerDialog__submitCell input {
  background: var(--palette-primary);
  color: #fff;
  padding: 1rem 2rem;
  border: 1px solid var(--palette-font-default);
}
</style>
