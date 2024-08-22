import axios from "axios"

export function useRestaurantHomeStatistics() {

  const last7DaysOrderCount = async () => {
    const response = await axios.get('api/dashboard/restaurant/home');
    return response;
  }

  return { last7DaysOrderCount };
}