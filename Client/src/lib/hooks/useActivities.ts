import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Custom hook using ReactQuery
export const useActivities = () => {
    const {data: activities, isPending} = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
      return response.data;
    }
  });

  return {
    activities,
    isPending
  }
}