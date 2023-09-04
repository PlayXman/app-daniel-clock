<script setup>
const props = defineProps({
  endDate: {
    type: Date,
  },
  now: {
    type: Date,
    required: true,
  }
});

// Difference between now and end date in seconds
const difference = ref(0);
const interval = ref(-1);

watch(() => props.endDate, () => {
  // Calculate difference in seconds
  let d = (props.endDate?.getTime() ?? 0) - props.now.getTime();
  d = Math.round(d / 1000);
  difference.value = d > 0 ? d : 0;

  // Update every second
  clearInterval(interval.value);
  interval.value = setInterval(() => {
    difference.value = difference.value - 1;

    if(difference.value <= 0) {
      clearInterval(interval.value);
    }
  }, 1000);
});

// Formatted time in HH:MM:SS
const time = computed(() => {
  const diff = difference.value;
  const formatter = Intl.NumberFormat('cz', {minimumIntegerDigits: 2, useGrouping: false});
  const result = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  if(diff > 0) {
    result.hours = Math.floor(diff / (60 * 60))
    result.minutes = Math.floor(diff % (60 * 60) / 60)
    result.seconds = Math.floor(diff % 60)
  }

  return `${formatter.format(result.hours)}:${formatter.format(result.minutes)}:${formatter.format(result.seconds)}`;
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
  font-family: monospace;
}
</style>
