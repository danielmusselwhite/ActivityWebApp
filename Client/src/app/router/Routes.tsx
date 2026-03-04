import { createBrowserRouter } from 'react-router';
import App from '../layout/App';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    }
])