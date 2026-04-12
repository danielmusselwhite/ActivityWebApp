import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccounts";
import type { Activity } from "../types";

// Custom class of hooks using ReactQuery relating to Activities controller
export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();
    const {currentUser} = useAccount();
    const location = useLocation();

    // Custom hook using ReactQuery to GetAll activities (useQuery for getting)
    const {data: activities, isLoading} = useQuery({
    queryKey: ['activities'], // key to identify this query
    queryFn: async () => { // main queryFn being used
      const response = await agent.get<Activity[]>('/activities'); // baseurl stored in the agent class
      return response.data;
    },
    enabled: !id
      && location.pathname ==='/activities' 
      && !!currentUser,
    
    select: data => { // Transform the data to include isHost and isGoing properties
      return data.map(activity => {
        return {
          ...activity,
          isHost: currentUser?.id === activity.hostId,
          isGoing: activity.attendees.some(a => a.id === currentUser?.id)
        }
      })
    }
  });

  // Custom hook using ReactQuery to Get a specific activity (useQuery for getting)
  const {data: activity, isLoading: isLoadingActivity} = useQuery({
    queryKey: ['activities', id], // also pass in the id as a unique key as we are cache specifically that activitys info
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`); 
      return response.data;
    },
    enabled: !!id
     && !!currentUser,
    select: data => { // Transform the data to include isHost and isGoing properties
      return {
        ...data,
        isHost: currentUser?.id === data.hostId,
        isGoing: data.attendees.some(a => a.id === currentUser?.id)
      }
    }
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
      console.error("Failed to delete activity:", error);
    }
  })

  const updateAttendance = useMutation({
    mutationFn: async (id: string) => {
      await agent.post(`/activities/${id}/attend`)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities', id]
      })
    },
    onError: (error) => {
      console.error("Failed to update attendance:", error);
    }
  })

  return {
    activities,
    isLoading,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
    updateAttendance
  }
}