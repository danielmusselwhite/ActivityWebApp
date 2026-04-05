import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";

// todo - delete this
const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    });
}

// Create an axios instance so configuration is centralized
// baseURL comes from environment variable (Vite syntax)
const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // "https://localhost:5001/api"
    withCredentials: true
});

agent.interceptors.request.use(config => {
    store.uiStore.isBusy(); // on use set our mobx store busy controller to true (eg to show loading spinner)
    return config;
})

/*
 Response interceptors runs AFTER every HTTP response.

 Parameters:
 - First function -> handles successful responses
 - Second function -> handles errors 

 This pattern is recommended by Axios.
*/
agent.interceptors.response.use(
    async response => {
        await sleep(1000); // todo - delete this
        store.uiStore.isIdle(); // on response set our mobx store busy controller to false (eg to hide loading spinner)
        return response;
    }, 
    async error => {
        
        await sleep(1000); // todo - delete this
        store.uiStore.isIdle(); // on response set our mobx store busy controller to false (eg to hide loading spinner)

        // Handle errors globally here (eg show toast notification)
        const {status, data} = error.response;
        switch (status) {
            case 400:
                // if data has errors property
                if(data.errors) {
                    const modalStateErrors = [];
                    // for each key in the errors
                    for(const key in data.errors){
                        // if there is a value, psuh it to modalStateErrors
                        if(data.errors[key]) {
                            modalStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modalStateErrors.flat();
                }
                else{
                    // toast.error('Bad request');
                    toast.error(data);
                }


                break;
            case 401:
                toast.error('Unauthorised');
                break;
            case 404:
                router.navigate('/not-found'); // navigate to not found page
                toast.error('Not found');
                break;
            case 500:
                router.navigate('/server-error', {state: {error: data}})
                toast.error('Server error');
                break;
        }

        // Return a rejected promise so that the error can also be handled in the component if needed (eg to show validation errors on form)
        return Promise.reject(error);
    }
);

export default agent;