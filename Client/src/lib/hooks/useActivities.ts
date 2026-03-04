import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

// Custom hook using ReactQuery to Get Information (useQuery)
export const useActivities = () => {
    const queryClient = useQueryClient();

    const {data: activities, isPending} = useQuery({
    queryKey: ['activities'], // key to identify this query
    queryFn: async () => { // main queryFn being used
      const response = await agent.get<Activity[]>('/activities'); // baseurl stored in the agent class
      return response.data;
    }
  });

  // Custom hook using ReactQuery to Update Information (useMutation)
  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => { // main mutationFn being used
      return await agent.put('/activities', activity) // baseurl stored in agent class, just making HTTP PUTting the activity into activities
    },
    onSuccess: async () => { // upon successfully updating the mutation...
      await queryClient.invalidateQueries({
        queryKey: ['activities'] // invalidate the query with key 'activities', meaning the data must be re-fetched (thus updating the cache)
      })
    },
    onError: (error) => {
      console.error("Failed to update activity:", error);
    }
  })

  return {
    activities,
    isPending,
    updateActivity
  }
}