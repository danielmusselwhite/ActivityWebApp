import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { Photo, Profile, User } from "../types";
import { useMemo } from "react";

export const useProfile = (id?: string) => {

    // #region queries
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
    // #endregion

    // #region Mutations
    const uploadPhoto = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await agent.post('/profiles/add-photo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' } // Set the content type to multipart/form-data for file upload
            });
            return response.data;
        },
        onSuccess: async (photo: Photo) => {
            await queryClient.invalidateQueries({ queryKey: ['photos', id] }); // Invalidate the photos query to refetch the updated list of photos for this user after a successful upload
            queryClient.setQueryData(['user'], (data: User) => {
                if (!data) return data; // If there is no user data in the cache, return it as is (this should not happen if the user is authenticated)
                return { // If there is user data in the cache, update the image URL with the new photo URL (if the user doesn't have an image URL already, otherwise keep the existing one)
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            })
            queryClient.setQueryData(['profile', id], (data: Profile) => {
                if (!data) return data; // If there is no profile data in the cache, return it as is (this should not happen if the profile is being viewed)
                return { // If there is profile data in the cache, update the image URL with the new photo URL (if the profile doesn't have an image URL already, otherwise keep the existing one)
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            })

        }
    })
    // #endregion

    // #region Memoized values (meaning they will only be recalculated when their dependencies change)
    // Check if the profile being viewed belongs to the currently authenticated user (by comparing the profile ID with the user ID stored in the query cache)
    const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData<User>(['user'])?.id
    }, [id, queryClient])
    // #endregion

    return { profile, loadingProfile, photos, loadingPhotos, isCurrentUser, uploadPhoto };
}