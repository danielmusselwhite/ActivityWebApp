import { Grid } from '@mui/material'
import ActivityList from './ActivityList'
import ActivityDetailPage from '../details/ActivityDetailPage'
import ActivityForm from '../form/ActivityForm'
import ActivityFilters from './ActivityFilters'

export default function ActivityDashboard() {
  return (
    <>
        <Grid container spacing={3}>
            <Grid size={8}>
                <ActivityList />
            </Grid>
            <Grid size={4}>
                <ActivityFilters />
            </Grid>
        </Grid>
    </>
  )
}
