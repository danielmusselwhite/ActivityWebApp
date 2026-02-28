import { useEffect, useState } from 'react';
import { CssBaseline, Container, Box } from '@mui/material';
import axios from "axios"
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  
  // useState creates a state (activities) in this component and provides a method to update it (setActivities), which when called will tell react to re-render this component
  // specified as a List of Activities (Activity[]), and defaulted to an empty list
  const [activities, setActivities] = useState<Activity[]>([]);

  // useEffect runs "side effects" (code that interacts with the outside world).
  useEffect(() => {
    // Communicate with my API endpoint to get the list of activities, then parsing that from json and passing it into SetActivities to re-rerender the component with the response
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))

      return () => {} // The return is a "Cleanup Function", called by React when component unmounts or before effect runs again (if dependencies change), in this case it runs '{}' (nothing)
  }, []) // Empty dependency array = run once on mount only.

  return (
    <Box sx={{backgroundImage: 'linear-gradient(135deg, #73a09b 0%, #a1d4c4 69%, #c4f3dc 89%)'}}>
      <CssBaseline/>
      <NavBar/>
      <Container maxWidth='xl' sx={{mt: 3}}>
          <ActivityDashboard activities={activities}/>
      </Container>
    </Box>
  )
}

export default App
