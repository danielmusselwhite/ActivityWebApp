import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import SimpleFrag from "../../../app/shared/components/SimpleFrag";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export default function ActivityDetailPage() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {activity, isLoadingActivity} = useActivities(id);

  if (isLoadingActivity){
    return (
      <SimpleFrag message="Loading activity..." />
    )
  }
  else if(!activity)
  {
    return (
    <Card sx={{borderRadius: 3}}>
      <Typography variant="h5">Activity Not Found</Typography>
    </Card>
      
    )
  }
  else {
    return (
      <Grid container spacing={3}>
          <Grid size={8}>
            <ActivityDetailsHeader activity={activity}/>
            <ActivityDetailsInfo activity={activity} />
            <ActivityDetailsChat />
          </Grid>
          <Grid size={4}>
            <ActivityDetailsSidebar />
          </Grid>
      </Grid>
    )
  }
}