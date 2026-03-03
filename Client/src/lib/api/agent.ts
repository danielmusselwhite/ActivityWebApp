import axios from "axios";

// todo - document this better

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    });
}

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL // "https://localhost:5001/api"
});

agent.interceptors.response.use(async response => {
    
    
    try{
        await sleep(1000);
        return response;
    }
    // log error then propagate it up
    catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
});

export default agent;