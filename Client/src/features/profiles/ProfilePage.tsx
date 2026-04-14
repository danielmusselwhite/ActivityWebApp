import { Grid } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

export default function ProfilePage() {
  return (
    <Grid container>
        <Grid size={12}>
            <ProfileHeader />
            <ProfileContent />
        </Grid>
    </Grid>
  )
}