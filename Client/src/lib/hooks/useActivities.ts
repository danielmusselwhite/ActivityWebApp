import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

// Custom hook using ReactQuery
export const useActivities = () => {
    const {data: activities, isPending} = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>('/activities'); // baseurl stored in the agent class
      return response.data;
    }
  });

  return {
    activities,
    isPending
  }
}