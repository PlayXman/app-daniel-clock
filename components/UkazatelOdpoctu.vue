<script setup>
import BigNumber from "bignumber.js";

const props = defineProps({
  delkaCasovace: {
    type: BigNumber,
    required: true,
  },
  prvniSpusteniCasovace: {
    type: BigNumber,
  },
  casSpusteni: {
    type: BigNumber,
    required: true,
  },
});

// Jak moc má být časovač zatím naplněný. Od minula již uběhlo určité množství procent.
const procenta = computed(() => {
  if(props.delkaCasovace <= 0 || props.prvniSpusteniCasovace == null) {
    return new BigNumber(0);
  }

  let vysledek = props.delkaCasovace.minus(props.casSpusteni.minus(props.prvniSpusteniCasovace)).div(props.delkaCasovace);
  vysledek = vysledek.times(100);
  vysledek = vysledek.decimalPlaces(0, BigNumber.ROUND_HALF_UP);

  return vysledek.isGreaterThan(0) ? vysledek : new BigNumber(0);
});

// Jak dlouho by měla animace trvat v sekundách.
const delka = computed(() => {
  if(props.prvniSpusteniCasovace == null) {
    return new BigNumber(0);
  }

  const procentniZlomek = procenta.value.div(100);
  let vysledek = props.delkaCasovace.times(procentniZlomek);
  vysledek = vysledek.decimalPlaces(0, BigNumber.ROUND_HALF_UP);

  return vysledek.isGreaterThan(0) ? vysledek : new BigNumber(0);
});

// Která animace má být použita.
const indexAnimace = ref(0);
watch(() => props.delkaCasovace, () => {
  indexAnimace.value = indexAnimace.value === 2 ? 1 : 2;
});
</script>

<template>
  <div class="progressBar">
    <div class="progressBar__value" :style="{
      width: `${procenta.toString()}%`,
      animationDuration: `${delka.toString()}s`,
      animationName: `progressBar-${indexAnimace}`,
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
