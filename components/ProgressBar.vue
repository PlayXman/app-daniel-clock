<script setup>
const props = defineProps({
  endDate: {
    type: Date,
  },
  entryDate: {
    type: Date,
  },
  now: {
    type: Date,
    required: true,
  }
});

// How much percent has already passed
const currentPercentage = computed(() => {
  if(props.endDate == null || props.entryDate == null) {
    return 0;
  }

  const entryTime = props.entryDate.getTime();
  let result = (props.now.getTime() - entryTime) / (props.endDate.getTime() - entryTime);
  result = (1 - result) * 100;
  result = Math.round(result);

  return result > 0 ? result : 0;
});

// How long should the animation take
const duration = computed(() => {
  if(props.endDate == null) {
    return 0;
  }

  const percentage = currentPercentage.value / 100;
  let result = props.endDate.getTime() * percentage - props.now.getTime();
  result = result / 1000;
  result = Math.round(result);

  return result > 0 ? result : 0;
});

// Which animation should be used
const animationIndex = ref(0);
watch(() => props.endDate, () => {
  animationIndex.value = animationIndex.value === 2 ? 1 : 2;
});
</script>

<template>
  <div class="progressBar">
    <div class="progressBar__value" :style="{
      width: `${currentPercentage}%`,
      animationDuration: `${duration}s`,
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
