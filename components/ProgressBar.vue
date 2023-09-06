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

// How much of the timer has passed in percentage since the last run.
const percentage = computed(() => {
  if(props.totalTimerDuration <= 0 || props.initialStartTime == null) {
    return new BigNumber(0);
  }

  let result = props.totalTimerDuration.minus(props.startTime.minus(props.initialStartTime)).div(props.totalTimerDuration);
  result = result.times(100);
  result = result.decimalPlaces(0, BigNumber.ROUND_HALF_UP);

  return result.isGreaterThan(0) ? result : new BigNumber(0);
});

// How long should the animation last in seconds.
const duration = computed(() => {
  if(props.initialStartTime == null) {
    return new BigNumber(0);
  }

  const percentageValue = percentage.value.div(100);
  let result = props.totalTimerDuration.times(percentageValue);
  result = result.decimalPlaces(0, BigNumber.ROUND_HALF_UP);

  return result.isGreaterThan(0) ? result : new BigNumber(0);
});

// Which animation should be used.
const animationIndex = ref(0);
watch(() => props.totalTimerDuration, () => {
  animationIndex.value = animationIndex.value === 2 ? 1 : 2;
});
</script>

<template>
  <div class="progressBar">
    <div class="progressBar__value" :style="{
      width: `${percentage.toString()}%`,
      animationDuration: `${duration.toString()}s`,
      animationName: `progressBar-${animationIndex}`,
    }"></div>
  </div>
</template>

<style>
@keyframes progressBar-1 {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}
@keyframes progressBar-2 {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

.progressBar {
  appearance: none;
  border: none;
  margin: 0;
  padding: 0;
  border-radius: 0;
  width: 100%;
  height: 3rem;
  background: #000;
}
.progressBar__value {
  background: var(--palette-primary);
  height: 100%;
  transform-origin: left center;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>
