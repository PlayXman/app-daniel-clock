<script setup>
import BigNumber from "bignumber.js";

const props = defineProps({
  /** Celková délka časovače v sekundách. */
  delkaCasovace: {
    type: BigNumber,
    required: true,
  },
  /** Datum prvního spuštění časovače v sekundách. */
  prvniSpusteniCasovace: {
    type: BigNumber,
  },
  /** Čas aktivace odpopočtu v sekundách. */
  casSpusteni: {
    type: BigNumber,
    required: true,
  },
});

// Jak dlouho by měla animace trvat v sekundách.
const delka = computed(() => {
  if(props.prvniSpusteniCasovace == null) {
    return new BigNumber(0);
  }
  return props.delkaCasovace;
});

// Jak moc časovače uběhlo od jeho spuštění. V sekundách.
const uplynuloSekund = computed(() => {
  if(props.prvniSpusteniCasovace == null) {
    return new BigNumber(0);
  }

  const vysledek = props.casSpusteni.minus(props.prvniSpusteniCasovace);
  if(vysledek.gt(delka.value)) {
    return delka.value;
  }
  return vysledek;
});

// Která animace má být použita.
const indexAnimace = ref(0);
watch(() => props.delkaCasovace, () => {
  indexAnimace.value = indexAnimace.value === 2 ? 1 : 2;
});
</script>

<template>
  <div class="ukazatelOdpoctu">
    <div class="ukazatelOdpoctu__hodnota" :style="{
      animationDuration: `${delka.toString()}s`,
      animationDelay: `-${uplynuloSekund.toString()}s`,
      animationName: `ukazatelOdpoctu-${indexAnimace}`,
    }"></div>
  </div>
</template>

<style>
@keyframes ukazatelOdpoctu-1 {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}
@keyframes ukazatelOdpoctu-2 {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

.ukazatelOdpoctu {
  appearance: none;
  border: none;
  margin: 0;
  padding: 0;
  border-radius: 0;
  width: 100%;
  height: 3rem;
  background: #000;
}
.ukazatelOdpoctu__hodnota {
  background: var(--paleta-primarni);
  width: 100%;
  height: 100%;
  transform-origin: left center;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>
