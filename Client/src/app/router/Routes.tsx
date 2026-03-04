import { createBrowserRouter } from 'react-router';
import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetail from '../../features/activities/details/ActivityDetail';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: '', element: <HomePage /> },
            {path: 'activities', element: <ActivityDashboard /> },
            {path: 'activities/:id', element: <ActivityDetail /> }, //':id is param string in url
            {path: 'manage/:id', element: <ActivityForm /> }, //':id is param string in url
            {path: 'createActivity', element: <ActivityForm key='create'/> }, // key so that it resets if re-navigated to (eg from one instance of create activity to another)
        ]
    }
])