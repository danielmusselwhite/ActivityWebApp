import { Paper, Typography, List, ListItem, Chip, ListItemAvatar, Avatar, ListItemText, Grid } from "@mui/material";
import type { Activity } from "../../../lib/types";

type Props = {
    activity: Activity
}

export default function ActivityDetailsSidebar({ activity }: Props) {
    const following = true;
    
    return (
        <>
            <Paper
                sx={{
                    textAlign: 'center',
                    border: 'none',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    p: 2,
                }}
            >
                <Typography variant="h6">
                    {activity.attendees.length} {activity.attendees.length === 1 ? 'Person' : 'People'} Going
                </Typography>
            </Paper>
            <Paper sx={{ padding: 2 }}>
                {activity.attendees.map(attendee => (
                    <Grid container alignItems="center" key={attendee.id}>
                        <Grid size={8}>
                            <List sx={{ display: 'flex', flexDirection: 'column' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="rounded"
                                            alt={attendee.displayName + "'s profile picture"}
                                            src={attendee.imageUrl || '/assets/user.png'}
                                            sx={{width:75, height:75, mr:3}}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Typography variant="h6">{attendee.displayName}</Typography>
                                        {following && (
                                            <Typography variant="body2" color="orange">
                                                Following
                                            </Typography>
                                        )}
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                            {activity.hostId === attendee.id && (
                                <Chip
                                    label="Host"
                                    color="warning"
                                    variant='filled'
                                    sx={{borderRadius: 2}}
                                />
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Paper>
        </>
    );
}