import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

// Custom class of hooks using ReactQuery relating to Activities controller
export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();

    // Custom hook using ReactQuery to GetAll activities (useQuery for getting)
    const {data: activities, isPending} = useQuery({
    queryKey: ['activities'], // key to identify this query
    queryFn: async () => { // main queryFn being used
      const response = await agent.get<Activity[]>('/activities'); // baseurl stored in the agent class
      return response.data;
    }
  });

  // Custom hook using ReactQuery to Get a specific activity (useQuery for getting)
  const {data: activity, isLoading: isLoadingActivity} = useQuery({
    queryKey: ['acitivites', id], // also pass in the id as a unique key as we are cache specifically that activitys info
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`); 
      return response.data;
    },
    enabled: !!id // only run if id is provided

  })

  // Custom hook using ReactQuery to Update Information (useMutation for manipulation)
  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => { // main mutationFn being used
      return (await agent.put('/activities', activity)).data // baseurl stored in agent class, just making HTTP PUTting the activity into activities
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

  // Custom hook using Reactquery to Create (useMutation for manipulation)
  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      return (await agent.post('/activities', activity)).data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities']
      })
    },
    onError: (error) => {
      console.error("Failed to create activity:", error);
    }
  })

  // Custom hook using Reactquery to Delete (useMutation for manipulation)
  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      return (await agent.delete(`/activities/${id}`)).data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities']
      })
    },
    onError: (error) => {
      console.error("Failed to create activity:", error);
    }
  })

  return {
    activities,
    isPending,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity
  }
}