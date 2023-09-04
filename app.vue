<script setup>
import ProgressClock from "~/components/ProgressClock.vue";

const timerDialogOpen = ref(false);
const endDate = ref();
const entryDate = ref();
const now = ref(new Date());

// Opens the set timer dialog
function openTimerDialog() {
  timerDialogOpen.value = true;
}

// Closes the set timer dialog
function closeTimerDialog() {
  timerDialogOpen.value = false;
}

// Sets and starts the timer
function setTimer({hours, minutes, seconds}) {
  const nextEntryDate = new Date();

  const nextEndDate = new Date(nextEntryDate);
  nextEndDate.setSeconds(nextEndDate.getSeconds() + seconds);
  nextEndDate.setMinutes(nextEndDate.getMinutes() + minutes);
  nextEndDate.setHours(nextEndDate.getHours() + hours);

  endDate.value = nextEndDate;
  entryDate.value = nextEntryDate;
  now.value = nextEntryDate;
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
