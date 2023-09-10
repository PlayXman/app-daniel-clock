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

// V sekundách.
const zbyvajiciCas = ref(new BigNumber(0));
// ID javascriptového "intervalu". Objektu, který spouští funkci každou sekundu.
const idIntervalu = ref(-1);

watch(() => props.delkaCasovace, () => {
  zbyvajiciCas.value = props.delkaCasovace.minus(props.casSpusteni.minus(props.prvniSpusteniCasovace));

  // Zastav případný běžící interval.
  clearInterval(idIntervalu.value);
  zbyvajiciCas.value = zbyvajiciCas.value.minus(1);
  // Spusť nový interval.
  idIntervalu.value = setInterval(() => {
    zbyvajiciCas.value = zbyvajiciCas.value.minus(1);

    if(zbyvajiciCas.value <= 0) {
      clearInterval(idIntervalu.value);
    }
  }, 1000);
});

// Naformátuj časovač v sekundách na HH:MM:SS (hodiny:minuty:sekundy).
const formatovanyCas = computed(() => {
  const rozdil = zbyvajiciCas.value;
  const formatovac = Intl.NumberFormat('cz', {minimumIntegerDigits: 2, useGrouping: false});
  const formatObjektuBigNumber = {};

  let hodiny = new BigNumber(0);
  let minuty = new BigNumber(0);
  let sekundy = new BigNumber(0);

  if(rozdil > 0) {
    hodiny = rozdil.div(60 * 60).decimalPlaces(0, BigNumber.ROUND_FLOOR);
    minuty = rozdil.mod(60 * 60).div(60).decimalPlaces(0, BigNumber.ROUND_FLOOR);
    sekundy = rozdil.mod(60).decimalPlaces(0, BigNumber.ROUND_FLOOR);
  }

  return `${formatovac.format(hodiny.toFormat(formatObjektuBigNumber))}:${formatovac.format(minuty.toFormat(formatObjektuBigNumber))}:${formatovac.format(sekundy.toFormat(formatObjektuBigNumber))}`;
});
</script>

<template>
  <div class="hodinyOdpoctu">
    {{ formatovanyCas }}
  </div>
</template>

<style>
.hodinyOdpoctu {
  font-size: clamp(1.5rem, 3vw, 3rem);
  text-align: center;
  line-height: 1;
  font-family: Arial, sans-serif;
}
</style>
