import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import Box from "@mui/material/Box";
import { Button, Divider, Typography } from "@mui/material";

export default function ProfileAbout() {
    const { id } = useParams(); // get ID query arg from url
    const { profile } = useProfile(id);

    return (
        <Box>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant="h5">About {profile?.displayName}</Typography>
                <Button variant="contained" color="primary">
                    Edit Profile
                </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ overflowY: 'auto', maxHeight: 300, p: 2 }}>
                <Typography variant="h6">Bio</Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {profile?.bio || "No Description Added Yet."}
                </Typography>
            </Box>
        </Box>
    )
}