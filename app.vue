<script setup>
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const endDate = ref();
const entryDate = ref();
const now = ref(new Date());

function setTimer(event) {
  event.preventDefault();

  const nextEntryDate = new Date();

  const nextEndDate = new Date(nextEntryDate);
  nextEndDate.setSeconds(nextEndDate.getSeconds() + seconds.value);
  nextEndDate.setMinutes(nextEndDate.getMinutes() + minutes.value);
  nextEndDate.setHours(nextEndDate.getHours() + hours.value);

  endDate.value = nextEndDate;
  entryDate.value = nextEntryDate;
  now.value = nextEntryDate;
}
</script>

<template>
  <vite-pwa-manifest />

  <main class="container">
    <section class="picture"></section>
    <section class="timer">
      <div class="timer__time">
        300000000:00:00
      </div>
      <div class="timer__progress">
        <Progress :entry-date="entryDate" :end-date="endDate" :now="now" />
      </div>
    </section>
  </main>

  <form @submit="setTimer">
    <label for="hours">Hodiny</label>
    <input id="hours" type="number" v-model="hours">

    <label for="minutes">Minuty</label>
    <input id="minutes" type="number" v-model="minutes">

    <label for="seconds">Sekundy</label>
    <input id="seconds" type="number" v-model="seconds">

    <input type="submit" value="Start">
  </form>
<!--      <v-container>-->
<!--        <v-row>-->
<!--          <v-col cols="12" sm="3">-->
<!--            <v-text-field label="Dny" variant="outlined" type="number" v-model="days" />-->
<!--          </v-col>-->
<!--          <v-col cols="12" sm="3">-->
<!--            <v-text-field label="Hodiny" variant="outlined" type="number" v-model="hours" />-->
<!--          </v-col>-->
<!--          <v-col cols="12" sm="3">-->
<!--            <v-text-field label="Minuty" variant="outlined" type="number" v-model="minutes" />-->
<!--          </v-col>-->
<!--          <v-col cols="12" sm="3">-->
<!--            <v-text-field label="Sekundy" variant="outlined" type="number" v-model="seconds" />-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-container>-->
</template>

<style>
:root {
  --palette-background: #FFFFFF;
  --palette-primary: #35aaea;
  --palette-secondary: #d1a43c;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: var(--palette-background);
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

.timer__time {
  font-size: clamp(1.5rem, 3vw, 3rem);
  text-align: center;
  line-height: 1;
  font-family: monospace;
}

.timer__progress {
  flex-grow: 1;
  min-width: 20%;
}
</style>
