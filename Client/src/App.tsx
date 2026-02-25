import { useEffect, useState } from 'react';
import './App.css'
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';

function App() {
  
  // useState creates a state (activities) in this component and provides a method to update it (setActivities), which when called will tell react to re-render this component
  // specified as a List of Activities (Activity[]), and defaulted to an empty list
  const [activities, setActivities] = useState<Activity[]>([]);

  // useEffect runs "side effects" (code that interacts with the outside world).
  useEffect(() => {
    // Communicate with my API endpoint to get the list of activities, then parsing that from json and passing it into SetActivities to re-rerender the component with the response
    fetch('https://localhost:5001/api/activities')
      .then(response => response.json())
      .then(data => setActivities(data))

      return () => {} // The return is a "Cleanup Function", called by React when component unmounts or before effect runs again (if dependencies change), in this case it runs '{}' (nothing)
  }, []) // Empty dependency array = run once on mount only.

  return (
    <>
      <Typography variant="h3">My React WebApp</Typography>
      <ul>
        {/* Map so that each activity gets its own List Entry */}
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </ul>
    </>
  )
}

export default App
