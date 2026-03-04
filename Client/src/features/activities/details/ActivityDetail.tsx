import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import LoadingFrag from "../../../app/app/shared/components/LoadingFrag";

export default function ActivityDetail() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {activity, isLoadingActivity} = useActivities(id);

  if (isLoadingActivity){
    return (
      <LoadingFrag/>
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
      <Card sx={{borderRadius: 3}}>
        <CardMedia
          component='img'
          src={`/images/categoryImages/${activity.category}.jpg`}
        />
        <CardContent>
          <Typography variant="h5">{activity.title}</Typography>
          <Typography variant="subtitle1" fontWeight="light">{activity.date}</Typography>
          <Typography variant="body1">{activity.description}</Typography>
        </CardContent>
        <CardActions>
          {/* todo - refactor to simplify */}
          <Button color="primary" onClick={() => navigate(`/manage/${activity.id}`)}>Edit</Button>
          <Button color="inherit" onClick={() => navigate('/activities')}>Cancel</Button>
        </CardActions>
      </Card>
    )
  }
}