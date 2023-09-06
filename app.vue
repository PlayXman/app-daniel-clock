<script setup>
import ProgressClock from "~/components/ProgressClock.vue";
import BigNumber from 'bignumber.js';

const timerDialogOpen = ref(false);

/** @type {Ref<UnwrapRef<BigNumber>>} in seconds */
const totalTimerDuration = ref(new BigNumber(0));
/** @type {Ref<UnwrapRef<BigNumber | undefined>>} in seconds */
const initialStartTime = ref();
/** @type {Ref<UnwrapRef<BigNumber>>} in seconds */
const startTime = ref(convertDateToSeconds(new Date()));

/**
 * @param {Date} date
 * @returns {BigNumber}
 */
function convertDateToSeconds(date) {
  return new BigNumber(date.getTime()).div(1000);
}

/**
 * Opens the set timer dialog.
 */
function openTimerDialog() {
  timerDialogOpen.value = true;
}

/**
 * Closes the set timer dialog.
 */
function closeTimerDialog() {
  timerDialogOpen.value = false;
}

/**
 * Sets and starts the timer.
 * @param {BigNumber} hours
 * @param {BigNumber} minutes
 * @param {BigNumber} seconds
 */
function setTimer({hours, minutes, seconds}) {
  let nextTotalTimerDuration = new BigNumber(seconds);
  nextTotalTimerDuration = nextTotalTimerDuration.plus(minutes.times(60));
  nextTotalTimerDuration = nextTotalTimerDuration.plus(hours.times(60 * 60));
  totalTimerDuration.value = nextTotalTimerDuration.decimalPlaces(0);

  const now = convertDateToSeconds(new Date());
  initialStartTime.value = now;
  startTime.value = now;
}
</script>

<template>
  <vite-pwa-manifest />

  <main class="container">
    <section class="picture" @click="openTimerDialog">
      <yellow-house-picture />
    </section>
    <section class="timer">
      <div>
        <progress-clock :end-date="endDate" :now="now" />
      </div>
      <div>
        <progress-bar :entry-date="entryDate" :end-date="endDate" :now="now" />
      </div>
    </section>
  </main>

  <set-timer-dialog :open="timerDialogOpen" :on-timer-set="setTimer" :on-close="closeTimerDialog" />
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
