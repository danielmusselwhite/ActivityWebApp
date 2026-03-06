import { Grid } from '@mui/material'
import ActivityList from './ActivityList'
import ActivityDetailPage from '../details/ActivityDetailPage'
import ActivityForm from '../form/ActivityForm'

export default function ActivityDashboard() {
  return (
    <>
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList />
            </Grid>
            <Grid size={5}>
                TODO - Activity filters go here
            </Grid>
        </Grid>
    </>
  )
}
