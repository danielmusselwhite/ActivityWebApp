import { useEffect, useState } from 'react';
import { CssBaseline, Container, Box } from '@mui/material';
import axios from "axios"
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  
  // useState creates a state (activities) in this component and provides a method to update it (setActivities), which when called will tell react to re-render this component
  // specified as a List of Activities (Activity[]), and defaulted to an empty list
  const [activities, setActivities] = useState<Activity[]>([]);

  // storing the selectedActivity
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  // state used to handle showing of the edit form
  const [editMode, setEditMode] = useState(false);

  // useEffect runs "side effects" (code that interacts with the outside world).
  useEffect(() => {
    // Communicate with my API endpoint to get the list of activities, then parsing that from json and passing it into SetActivities to re-rerender the component with the response
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))

      return () => {} // The return is a "Cleanup Function", called by React when component unmounts or before effect runs again (if dependencies change), in this case it runs '{}' (nothing)
  }, []) // Empty dependency array = run once on mount only.

  //functions to handle setting the selected activity
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  //functions to handle deleting activity
  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(x => x.id !== id)); // todo - just dummy deleting locally in memory for now
  }

  // functions to handle showing of the edit form
  const handleOpenEditForm = (id?: string) => {
  if(id) 
    handleSelectActivity(id);
    else
      handleCancelSelectActivity();
    setEditMode(true);
  }
  const handleCloseEditForm = () => {
    setEditMode(false);
  }
  const handleSubmitForm = (activity: Activity) => {
    if(activity.id) {
      setActivities(activities.map(x => x.id === activity.id ? activity : x)) // if this activities id is a match, then update its value with this activity; else use the existing activity
      setSelectedActivity(activity); // set so that we update the UI
    }
    else{
      const newActivity = {...activity, id: activities.length.toString()} // what is this syntax + set id to new id insert
      setActivities([...activities, newActivity]) // append new activity 
      setSelectedActivity(activity); // set so that we update the UI
    }
    setEditMode(false);
  }


  return (
    <Box sx={{backgroundImage: 'linear-gradient(135deg, #73a09b 0%, #a1d4c4 69%, #c4f3dc 89%)'}}>
      <CssBaseline/>
      <NavBar openForm={handleOpenEditForm}/>
      <Container maxWidth='xl' sx={{mt: 3}}>
          {/* passing to activity dashboard the activities, selected activity, and handler methods */}
          <ActivityDashboard 
            activities={activities}
            selectActivity = {handleSelectActivity}
            cancelSelectActivity = {handleCancelSelectActivity}
            selectedActivity = {selectedActivity}
            openForm={handleOpenEditForm} 
            closeForm={handleCloseEditForm}
            editMode={editMode}
            submitForm={handleSubmitForm}
            deleteActivity={handleDeleteActivity}
          />
      </Container>
    </Box>
  )
}

export default App
