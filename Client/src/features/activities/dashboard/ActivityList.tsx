import { Box } from '@mui/material'
import ActivityCard from '../ActivityCard'
import { useActivities } from '../../../lib/hooks/useActivities';
import LoadingFrag from '../../../app/app/shared/components/LoadingFrag';

export default function ActivityList() {
  const {activities, isPending} = useActivities(); // using our custom hook to get activities and ispending state
  
  if(!activities || isPending)
  {
    return (
        <LoadingFrag />
    )
  }
  else{
  return (
      <Box sx={{display: 'flex', flexDirection:'column', gap:3}}>
          {activities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
          ))}

      </Box>
    )
  }

  
}
