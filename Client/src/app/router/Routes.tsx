import { createBrowserRouter, Navigate } from 'react-router';
import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetailPage from '../../features/activities/details/ActivityDetailPage';
import Counter from '../../features/counter/Counter';
import TestErrors from '../../features/errors/TestErrors';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/account/LoginForm';
import RequireAuth from './RequireAuth';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

        children: [
            
            // auth requiring routes nested inside here
            {element: <RequireAuth />, children: [
                {path: 'activities', element: <ActivityDashboard /> },
                {path: 'activities/:id', element: <ActivityDetailPage /> }, //':id is param string in url
                {path: 'manage/:id', element: <ActivityForm /> }, //':id is param string in url
                {path: 'createActivity', element: <ActivityForm key='create'/> }, // key so that it resets if re-navigated to (eg from one instance of create activity to another)
            ]},

            // public routes
            {path: '', element: <HomePage /> },{path: 'counter', element: <Counter /> }, 
            {path: 'errors', element: <TestErrors /> }, 
            {path: 'not-found', element: <NotFound /> }, 
            {path: 'server-error', element: <ServerError /> }, 
            {path: 'login', element: <LoginForm /> }, 
            {path: '*', element: <Navigate replace to='/not-found' /> } // catch all for any undefined routes and navigate to not found page, 
            
        ]
    }
])