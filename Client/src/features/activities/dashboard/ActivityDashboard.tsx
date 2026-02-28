import { Grid, List, ListItemText } from '@mui/material'
import ActivityList from './ActivityList'
import { act } from 'react'

type Props = {
    activities: Activity[]
}

export default function ActivityDashboard({activities}: Props) {
  return (
    <>
        <Grid container>
            <Grid size={9}>
                <ActivityList activities={activities}/>
            </Grid>
        </Grid>
    </>
  )
}
