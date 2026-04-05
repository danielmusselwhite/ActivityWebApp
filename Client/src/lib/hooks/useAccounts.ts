import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"
import type { User } from "../types";
import { useNavigate } from 'react-router';
import type { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Mutation to Login user
    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post<User>('/login?useCookies=true', creds); // login endpoint will set httpOnly cookie with the token, so no need to handle token in client, just need to include credentials in request and let browser handle the cookie
        },
        onSuccess: async() => {
            await queryClient.invalidateQueries({ queryKey: ['user'] }) // done so it invalidates the queryKey user so we will have to redo the request to get the user data
        }
    });

    // Mutation to Logout user
    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout'); // logout endpoint will clear the httpOnly cookie with the token, so no need to handle token in client, just need to include credentials in request and let browser handle the cookie
        },
        onSuccess: async() => {
            await queryClient.removeQueries({ queryKey: ['user'] }) // remove the user query from cache on logout so we don't have stale user data
            await queryClient.removeQueries({ queryKey: ['activities'] }) // remove activities query from cache on logout so we don't have stale data that might be user specific
            await navigate('/'); // navigate to home page on logout
        }
    })

    // Mutation to Register user
    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds); // register endpoint will set httpOnly cookie with the token, so no need to handle token in client, just need to include credentials in request and let browser handle the cookie
        },
        onSuccess: async() => {
            toast.success('Registration successful, you can now login');
        }
    });

    // Query to get current user info based on the token in the cookie
    const {data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info'); // endpoint to get current user info based on the token in the cookie, will return 401 if not authenticated
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']) // only run this query if we don't already have user data in cache, this is to prevent unnecessary requests to the server on app load if we already have user data from a previous session
    })

    return { loginUser, logoutUser, registerUser, currentUser, loadingUserInfo }
}