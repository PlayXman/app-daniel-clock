<script setup>
import BigNumber from "bignumber.js";

const props = defineProps({
  totalTimerDuration: {
    type: BigNumber,
    required: true,
  },
  initialStartTime: {
    type: BigNumber,
  },
  startTime: {
    type: BigNumber,
    required: true,
  },
});

// In seconds.
const remainingTime = ref(new BigNumber(0));
// Current interval timer ID.
const interval = ref(-1);

watch(() => props.totalTimerDuration, () => {
  remainingTime.value = props.totalTimerDuration.minus(props.startTime.minus(props.initialStartTime));

  // Start the timer after 0.5s and update every second.
  clearInterval(interval.value);
  setTimeout(() => {
    remainingTime.value = remainingTime.value.minus(1);

    interval.value = setInterval(() => {
      remainingTime.value = remainingTime.value.minus(1);

      if(remainingTime.value <= 0) {
        clearInterval(interval.value);
      }
    }, 1000);
  }, 500);
});

// Formatted time in HH:MM:SS
const time = computed(() => {
  const diff = remainingTime.value;
  const formatter = Intl.NumberFormat('cz', {minimumIntegerDigits: 2, useGrouping: false});
  const bigNumberFormat = {};

  let hours = new BigNumber(0);
  let minutes = new BigNumber(0);
  let seconds = new BigNumber(0);

  if(diff > 0) {
    hours = diff.div(60 * 60).decimalPlaces(0, BigNumber.ROUND_FLOOR);
    minutes = diff.mod(60 * 60).div(60).decimalPlaces(0, BigNumber.ROUND_FLOOR);
    seconds = diff.mod(60).decimalPlaces(0, BigNumber.ROUND_FLOOR);
  }

  return `${formatter.format(hours.toFormat(bigNumberFormat))}:${formatter.format(minutes.toFormat(bigNumberFormat))}:${formatter.format(seconds.toFormat(bigNumberFormat))}`;
});
</script>

<template>
  <div class="progressClock">
    {{time}}
  </div>
</template>

<style>
.progressClock {
  font-size: clamp(1.5rem, 3vw, 3rem);
  text-align: center;
  line-height: 1;
  font-family: Arial, sans-serif;
}
</style>
