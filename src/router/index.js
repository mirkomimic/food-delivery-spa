import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { quest, questRestaurant, authRestaurant, questCourier, authCourier } from '@/guards/guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
      beforeEnter: quest
    },
    {
      path: '/restaurants/login',
      name: 'restaurants.login',
      component: () => import('../views/auth/LoginRestaurants.vue'),
      beforeEnter: questRestaurant
    },
    {
      path: '/restaurant/dashboard',
      name: 'restaurant.dashboard',
      component: () => import('../views/dashboards/restaurants/Index.vue'),
      beforeEnter: authRestaurant
    },
    {
      path: '/restaurant/dashboard/products',
      name: 'restaurant.dashboard.products',
      component: () => import('../views/dashboards/restaurants/Products.vue'),
      beforeEnter: authRestaurant
    },
    {
      path: '/couriers/login',
      name: 'couriers.login',
      component: () => import('../views/auth/LoginCouriers.vue'),
      beforeEnter: questCourier
    },
    {
      path: '/courier/dashboard',
      name: 'courier.dashboard',
      component: () => import('../views/dashboards/couriers/Index.vue'),
      beforeEnter: authCourier
    },
    {
      path: '/restaurant/:id/products',
      name: 'restaurant.products',
      component: () => import('../views/shop/RestaurantProducts.vue'),
      props: true,
    },
  ]
})

export default router
