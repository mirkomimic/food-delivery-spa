<template>
  <Bar
    :data="data"
    :options="options"
  />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed, ref } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  last7DaysOrderCount: {
    type: Array,
    required: true
  }
})

const data = ref({
  labels: computed(() => { 
    const data = props.last7DaysOrderCount.map((d) => d.formatted_date)
    return data.reverse();
  }),
  datasets: [{
    label: 'Order count',
    data: computed(() => { 
      const data = props.last7DaysOrderCount.map((d) => d.order_count)
      return data.reverse();
    }),
    backgroundColor: '#183240',
  }]
})

const options = {
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Last 7 days'
    },
  },
}


</script>