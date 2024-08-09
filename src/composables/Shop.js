import axios from "axios";

export function useShop() {
  const getRestaurants = async (form) => {
    const response = await axios.get(`api/home`, {
      params: {
        page: form.value.page,
        categories: form.value.categories
      }
    });
    return response;
  }

  const getRestaurantProducts = async (form) => {
    const response = await axios.get(`api/restaurant/${form.value.restaurant_id}/products?page=${form.value.page}`, form.value);
    return response;
  }

  return { getRestaurants, getRestaurantProducts };
}