import { Box } from '@mui/material'
import ActivityCard from '../ActivityCard'

type Props = {
    activities: Activity[]
}

export default function ActivityList({activities}: Props) {
  return (
    <Box sx={{display: 'flex', flexDirection:'column', gap:3}}>
        {activities.map(activity => (
            <ActivityCard key={activity.id} activity={activity}/>
        ))}

    </Box>
  )
}
