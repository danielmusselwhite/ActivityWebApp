import { useEffect, useState } from 'react';
import './App.css'

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
    <div>
      <h3>My React WebApp</h3>
      <ul>
        {/* Map so that each activity gets its own List Entry */}
        {activities.map((activity) => (
          <li key={activity.id}>{activity.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
