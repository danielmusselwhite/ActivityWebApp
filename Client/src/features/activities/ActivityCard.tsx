import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router";

type Props ={
    activity: Activity
}

export default function ActivityCard({activity}: Props) {
    const navigate = useNavigate();

    // variables to handle layout of card
    const isHost = false;
    const isGoing = false;
    const label = isHost ? "You are hosting" : "You are going";
    const isCancelled = false;
    const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default'

    return (
        <Card elevation={3} sx={{borderRadius: 3}}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <CardHeader 
                avatar={<Avatar sx={{height: 80, width: 80}} />}
                title={activity.title}
                titleTypographyProps={{
                    fontWeight: 'bold',
                    fontSize: 20
                }}
                subheader={
                    <>
                        Hosted by{' '} <Link to={`/profiles/toDo`}>ToDO</Link>
                    </>
                }
                />
                <Box display="flex" flexDirection="column" gap={2} mr={2}>
                    {(isHost || isGoing) && <Chip label={label} color={color} sx={{borderRadius: 2}}/>} {/* if isHost or isGoing is True, show the appropriate Label chip */}
                    {isCancelled && <Chip label="Cancelled" color="error" sx={{borderRadius: 2}} />} {/* if isCancelled is True, show 'Cancelled' chip */}
                </Box>
            </Box>

            <Divider sx={{mb: 3}} />

            <CardContent sx={{p: 0}}>
                <Box display="flex" alignItems="center" mb={2} px={2}>
                    <AccessTime sx={{mr: 1}} />
                    <Typography variant="body2">{activity.date}</Typography>
                    <Place sx={{ml: 3, mr: 1}}/>
                    <Typography variant="body2">{activity.venue}</Typography>
                <Chip label={activity.category} variant="outlined" />
                </Box>
                <Divider />
                <Box display="flex" gap={2} sx={{backgroundColor: 'grey.200', py: 3, pl: 3}}>
                    ToDo - Add Attendees
                </Box>
            </CardContent>

            <CardActions sx={{display: 'flex', justifyContent: 'space-between', pb: 2}}>     
                <Typography variant="body2">{activity.description}</Typography>
                <Button size="medium" variant="contained" onClick={() => {navigate(`/activities/${activity.id}`)}} sx={{display: 'flex', justifySelf: 'self-end', borderRadius: 3}}>View</Button>
            </CardActions>
        </Card>
    )
}
