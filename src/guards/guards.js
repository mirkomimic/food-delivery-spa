import { useAuthStore } from "@/store/auth.js";
import { useCouriersAuthStore } from "@/store/authCouriers";
import { useRestaurantsAuthStore } from "@/store/authRestaurants";

const quest = (to, from, next) => {
  const { isLoggedIn } = useAuthStore();
  if (!isLoggedIn) {
    next();
  } else {
    next({name: 'home'});
  }
}

const questRestaurant = (to, from, next) => {
  const { isLoggedIn } = useRestaurantsAuthStore();
  if (!isLoggedIn) {
    next();
  } else {
    next({name: 'restaurant.dashboard'});
  }
}

const authRestaurant = (to, from, next) => {
  const { isLoggedIn } = useRestaurantsAuthStore();
  if (isLoggedIn) {
    next();
  } else {
    next({name: 'restaurants.login'});
  }
}

const questCourier = (to, from, next) => {
  const { isLoggedIn } = useCouriersAuthStore();
  if (!isLoggedIn) {
    next();
  } else {
    next({name: 'courier.dashboard'});
  }
}

const authCourier = (to, from, next) => {
  const { isLoggedIn } = useCouriersAuthStore();
  if (isLoggedIn) {
    next();
  } else {
    next({name: 'couriers.login'});
  }
}

export { quest, questRestaurant, authRestaurant, questCourier, authCourier };