import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"
import type { User } from "../types";

export const useAccount = () => {
    const queryClient = useQueryClient();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post<User>('/login?useCookies=true', creds); // login endpoint will set httpOnly cookie with the token, so no need to handle token in client, just need to include credentials in request and let browser handle the cookie
        },
        onSuccess: async() => {
            await queryClient.invalidateQueries({ queryKey: ['user'] }) // done so it invalidates the queryKey user so we will have to redo the request to get the user data
        }
    });

    const {data: currentUser} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info'); // endpoint to get current user info based on the token in the cookie, will return 401 if not authenticated
            return response.data;
        }
    })

    return { loginUser, currentUser }
}