import { Group, RoundedCorner } from "@mui/icons-material";
import { Box, Button, Card, Container, Link, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(135deg, #15635f 0%, #21ae84 69%, #20ac66 89%)'
      }}
    >

      <Box sx={{display:'flex', alignItems:'center',alignContext:'center', color:'white', gap:3}}>

        <Group sx={{height:110, width:110}} />
        <Typography variant="h1">Activity WebApp</Typography>
      </Box>
        <Typography variant="h2">Welcome User</Typography>

        <Button
          onClick={() => {navigate('/activities')}}
          size='large'
          variant='contained'
          sx={{height:80, borderRadius:4, fontSize:'1.5rem'}}>
            Take me to the activities
          </Button>
    </Paper>
  )
}