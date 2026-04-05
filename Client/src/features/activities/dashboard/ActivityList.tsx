import { Box } from '@mui/material'
import ActivityCard from '../ActivityCard'
import { useActivities } from '../../../lib/hooks/useActivities';
import SimpleFrag from '../../../app/app/shared/components/SimpleFrag';
import { useAccount } from '../../../lib/hooks/useAccounts';

export default function ActivityList() {
  const {activities, isLoading} = useActivities(); // using our custom hook to get activities and ispending state

  if(isLoading)
  {
    return (
        <SimpleFrag message="Loading activities..." />
    )
  }
  else if(!activities || activities.length === 0)
  {
    return (
        <SimpleFrag message="No activities found." />
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
