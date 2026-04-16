import { Card, Avatar, Typography, Chip, CardMedia, CardContent, Box, Divider } from "@mui/material";
import { Link } from "react-router";
import type { Profile } from "../../lib/types";
import Person from "@mui/icons-material/Person";

type Props = {
  profile: Profile
}

export default function ProfileCard({ profile }: Props) {
  const following = false; // ToDo - determine if the current user is following this profile

  return (
    <Link to={`profiles/${profile.id}`} style={{ textDecoration: 'none' }}>
      <Card elevation={3} sx={{ borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <CardMedia component="img" src={profile?.imageUrl || '/images/user.png'} alt={`${profile.displayName}'s profile picture`} sx={{ width: "100%", zIndex: 50 }} />

        <CardContent>
          <Box display="flex" flexDirection="column" gap={1} mb={1}>
            <Typography variant="h6" fontWeight="bold">{profile.displayName}</Typography>
            {profile.bio && (
              <Typography variant="body2" sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                maxWidth: 200
              }}>
                {profile.bio}
              </Typography>
            )}
            {following && <Chip label="Following" color="primary" size="small" variant="outlined" />}
          </Box>
          <Typography variant="body2" color="textSecondary">{profile.bio}</Typography>
        </CardContent>
        <Divider sx={{ width: '100%', mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
          <Person />
          <Typography variant="body2" ml={1}>Followers: ToDo</Typography>
        </Box>
      </Card>
    </Link>
  )
}