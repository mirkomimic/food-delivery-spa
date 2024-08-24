<template>
  <NavBar title="Restaurant - Dashboard"/>
  
  <main class="container min-h-screen mx-auto lg:grid lg:grid-cols-12">
    <div class="col-span-12 lg:col-span-3">
      <SideNav/>
    </div>
    <div class="col-span-12 lg:col-span-9">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="py-5 px-3 flex justify-center">
          <OrdersDailyChart
            v-if="last7DaysOrderCount"
            :last7DaysOrderCount="last7DaysOrderCount"
          />
        </div>
        <div class="py-5 px-3 flex justify-center">
          <OrdersMonthlyTotalChart
            v-if="ordersTotalMonthly"
            :ordersTotalMonthly="ordersTotalMonthly"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import OrdersDailyChart from '@/components/charts/OrdersDailyChart.vue';
import NavBar from '../NavBar.vue';
import SideNav from './partials/SideNav.vue';
import { useRestaurantHomeStatistics } from '@/composables/statistics/RestaurantHomeStatistics';
import { onMounted, ref } from 'vue';
import OrdersMonthlyTotalChart from '@/components/charts/OrdersMonthlyTotalChart.vue';

const restaurantHomeStats = useRestaurantHomeStatistics()
const last7DaysOrderCount = ref()
const ordersTotalMonthly = ref()

const getOrdersByRestDaily = async () => {
  try {
    const response = await restaurantHomeStats.last7DaysOrderCount()
    if (response) {
      console.log(response);
      last7DaysOrderCount.value = response.data.last7DaysOrderCount
      ordersTotalMonthly.value = response.data.ordersTotalMonthly
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getOrdersByRestDaily()
})

</script>