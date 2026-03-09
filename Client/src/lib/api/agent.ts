import axios from "axios";
import { store } from "../stores/store";

// todo - delete this
const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    });
}

// Create an axios instance so configuration is centralized
// baseURL comes from environment variable (Vite syntax)
const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL // "https://localhost:5001/api"
});

agent.interceptors.request.use(config => {
    store.uiStore.isBusy(); // on use set our mobx store busy controller to true
    return config;
})

/*
 Response interceptors runs AFTER every HTTP response.

 Parameters:
 - First function -> handles successful responses
 - Second function -> handles errors // todo - not yet implemented

 This pattern is recommended by Axios.
*/
agent.interceptors.response.use(async response => {
    try{
        await sleep(1000); // todo - delete this
        return response;
    }
    // log error then propagate it up
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
    finally{
        store.uiStore.isIdle(); // set the MobX store to isIdle for displaying busy/idle
    }
});

export default agent;