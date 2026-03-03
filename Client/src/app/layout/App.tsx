import { useState } from 'react';
import { CssBaseline, Container, Box, Typography, Card } from '@mui/material';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { useActivities } from '../../lib/hooks/useActivities';

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined); // storing the selectedActivity
  const [editMode, setEditMode] = useState(false); // state used to handle showing of the edit form
  const {activities, isPending} = useActivities(); // using our custom hook to get activities and ispending state
  

  //#region  handler functions
  //#region functions to handle setting the selected activity
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id));
  }
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }
  //#endregion

  //#region functions to handle deleting activity
  const handleDeleteActivity = (id: string) => {
    // setActivities(activities.filter(x => x.id !== id)); // todo - just dummy deleting locally in memory for now
  }
  //#endregion

  //#region functions to handle showing of the edit form
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
    // if(activity.id) {
    //   setActivities(activities!.map(x => x.id === activity.id ? activity : x)) // if this activities id is a match, then update its value with this activity; else use the existing activity
    //   setSelectedActivity(activity); // set so that we update the UI
    // }
    // else{
    //   const newActivity = {...activity, id: activities!.length.toString()} // add key/values from activity passed in, and additional temp id 
    //   setActivities([...activities!, newActivity]) // append new activity 
    //   setSelectedActivity(activity); // set so that we update the UI
    // }
    setEditMode(false);
  }
  //#endregion
  //#endregion


  return (
    <Box sx={{backgroundImage: 'linear-gradient(135deg, #73a09b 0%, #a1d4c4 69%, #c4f3dc 89%)'}} minHeight="100vh">
      <CssBaseline/>
      <NavBar openForm={handleOpenEditForm}/>
      <Container maxWidth='xl' sx={{mt: 3}}>
          {/* passing to activity dashboard the activities, selected activity, and handler methods */}
          {
            !activities || isPending 
            ? (
              <Card>
                <Typography variant='h5'>Loading...</Typography>
              </Card>
            )
            : (
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
            )
          }
      </Container>
    </Box>
  )
}

export default App;