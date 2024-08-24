<template>
  <Line :data="data" :options="options" />
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { computed, ref } from 'vue';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps({
  ordersTotalMonthly: {
    type: Array,
    required: true
  }
})

const data = ref({
  labels: computed(() => { 
    return props.ordersTotalMonthly.map((d) => d.month)
  }),
  datasets: [
    {
      label: 'Orders total',
      backgroundColor: '#0fb839',
      borderColor: '#183240',
      data: computed(() => { 
        return props.ordersTotalMonthly.map((d) => d.total_amount)
      }),
    }
  ]
})

const options = {
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Orders Total Monthly'
    },
  },
}

</script>