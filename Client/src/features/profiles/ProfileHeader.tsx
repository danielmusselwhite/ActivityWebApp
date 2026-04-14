import { Avatar, Box, Button, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import type { Profile } from "../../lib/types";

type Props = {
    profile: Profile
}

export default function ProfileHeader({ profile }: Props) {
    const isFollowing = true; // todo - temp until we implement API-side funcitonality
  
    return (
        <Paper elevation={3} sx={{p: 4, borderRadius: 3}}>
            <Grid container spacing={2}>
                <Grid size={8}>
                    <Stack direction='row' spacing={3} alignItems='center'>
                        <Avatar sx={{width: 150, height: 150}} src={profile.imageUrl} alt={`${profile.displayName}'s profile picture`} />
                        <Box display='flex' flexDirection='column' gap={2}>
                            <Typography variant="h4">{profile.displayName}</Typography>
                            {isFollowing && <Chip variant="outlined" color="secondary" label="Following" 
                            sx={{borderRadius: 1}}
                            />}
                        </Box>
                    </Stack>
                </Grid>

                <Grid size={4} >
                    <Stack spacing={2} alignItems='center'>
                        <Box display="flex" justifyContent="space-around" width="100%">
                            <Box textAlign="center">
                                <Typography variant="h6">Followers</Typography>
                                <Typography variant="h3">123</Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h6">Following</Typography>
                                <Typography variant="h3">42</Typography>
                            </Box>
                        </Box>
                        <Divider sx={{width: '100%'}} />
                        <Button variant={isFollowing ? "outlined" : "contained"} color={isFollowing ? "error" : "success"} fullWidth>
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Button>
                    </Stack>
                </Grid>

            </Grid>

        </Paper>
  )
}