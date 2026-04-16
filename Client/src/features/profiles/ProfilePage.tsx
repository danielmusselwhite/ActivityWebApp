import { Grid } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { use } from "react";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import SimpleFrag from "../../app/shared/components/SimpleFrag";

export default function ProfilePage() {
  const { id } = useParams(); // getting the 'id' from the URL parameters
  const { profile, loadingProfile } = useProfile(id);

  if (loadingProfile) return <SimpleFrag message="Loading profile..." />;
  if (!profile) return <SimpleFrag message="Profile not found." />;

  return (
    <Grid container>
      <Grid size={12}>
        <ProfileHeader profile={profile} />
        <ProfileContent />
      </Grid>
    </Grid>
  )
}