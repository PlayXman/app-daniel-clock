<script setup>
import BigNumber from 'bignumber.js';

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  onTimerSet: {
    type: Function,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

const hours = ref("0");
const minutes = ref("0");
const seconds = ref("0");

/**
 * Handles the start button click. And sets time on the timer.
 * @param event
 */
function handleSubmit(event) {
  event.preventDefault();

  props.onClose();

  props.onTimerSet({
    hours: new BigNumber(hours.value),
    minutes: new BigNumber(minutes.value),
    seconds: new BigNumber(seconds.value),
  });
}
</script>

<template>
  <dialog v-show="open" class="setTimerDialog">
    <form @submit="handleSubmit" class="setTimerDialog__content">
      <div class="setTimerDialog__fields">
        <div>
          <label for="hours">Hodiny</label>
          <input id="hours" type="number" min="0" :value="hours" @input="hours = $event.target.value || '0'">
        </div>

        <div>
          <label for="minutes">Minuty</label>
          <input id="minutes" type="number" min="0" :value="minutes" @input="minutes = $event.target.value || '0'">
        </div>

        <div>
          <label for="seconds">Sekundy</label>
          <input id="seconds" type="number" min="0" :value="seconds" @input="seconds = $event.target.value || '0'">
        </div>
      </div>

      <div class="setTimerDialog__submitCell">
        <input type="submit" value="Start">
      </div>
    </form>

    <div class="setTimerDialog__backdrop" @click="onClose" />
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
