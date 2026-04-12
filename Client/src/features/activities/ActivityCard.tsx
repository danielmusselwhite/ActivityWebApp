import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router";
import { formatDate } from "../../lib/util/util";
import type { Activity } from "../../lib/types";
import AvatarPopover from "../../app/shared/components/AvatarPopover";

type Props ={
    activity: Activity
}

export default function ActivityCard({activity}: Props) {
    const navigate = useNavigate();

    // variables to handle layout of card
    const label = activity.isHost ? "You are hosting" : "You are going";
    const color = activity.isHost ? 'secondary' : activity.isGoing ? 'warning' : 'default'

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
                        Hosted by{' '} 
                        <Link to={`/profiles/${activity.hostId}`}>
                            {activity.hostDisplayName}
                        </Link>
                    </>
                }
                />
                <Box display="flex" flexDirection="column" gap={2} mr={2}>
                    {(activity.isHost || activity.isGoing) && <Chip label={label} color={color} sx={{borderRadius: 2}} variant="outlined"/>} {/* if isHost or isGoing is True, show the appropriate Label chip */}
                    {activity.isCancelled && <Chip label="Cancelled" color="error" sx={{borderRadius: 2}} variant="outlined"/>} {/* if isCancelled is True, show 'Cancelled' chip */}
                </Box>
            </Box>

            <Divider sx={{mb: 3}} />

            <CardContent sx={{p: 0}}>
                <Box display="flex" alignItems="center" mb={2} px={2}>
                    <Box display='flex' flexGrow={0} alignItems='center'>
                        <AccessTime sx={{mr: 1}} />
                        <Typography variant="body2" noWrap>{formatDate(activity.date)}</Typography>
                    </Box>
                    <Place sx={{ml: 3, mr: 1}}/>
                    <Typography variant="body2">{activity.venue}</Typography>
                    <Chip label={activity.category} variant="outlined" sx={{ml: 2}}/>
                </Box>

                <Divider />
                <Box display="flex" gap={2} sx={{backgroundColor: 'grey.200', py: 3, pl: 3}}>
                    {activity.attendees.map(att => (
                        <AvatarPopover key={att.id} profile={att} />
                    ))}
                </Box>
            </CardContent>

            <CardActions sx={{display: 'flex', justifyContent: 'space-between', pb: 2}}>     
                <Typography variant="body2">{activity.description}</Typography>
                <Button size="medium" variant="contained" onClick={() => {navigate(`/activities/${activity.id}`)}} sx={{display: 'flex', justifySelf: 'self-end', borderRadius: 3}}>View</Button>
            </CardActions>
        </Card>
    )
}
