import { useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { Photo, Profile, User } from "../types";
import { useMemo } from "react";

export const useProfile = (id?: string) => {
    const queryClient = useQueryClient();

    const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<Profile>(`profiles/${id}`);
            return response.data;
        },
        enabled: !!id 
    })

    const { data: photos, isLoading: loadingPhotos } = useQuery<Photo[]>({
        queryKey: ['photos', id],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(`profiles/${id}/photos`);
            return response.data;
        },
        enabled: !!id 
    })

    // Check if the profile being viewed belongs to the currently authenticated user (by comparing the profile ID with the user ID stored in the query cache)
    const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData<User>(['user'])?.id
    }, [id, queryClient])

    return { profile, loadingProfile, photos, loadingPhotos, isCurrentUser };
}