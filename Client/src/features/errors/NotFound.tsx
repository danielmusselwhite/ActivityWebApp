import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { alignItems } from "@mui/system";
import { useNavigate } from "react-router";

export default function NotFound() {
const navigate = useNavigate();
    
  return (
    
    <Paper
        sx={{
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 6
        }}
    >

        <SearchOff color="error" sx={{fontSize: 80}}/>
        <Typography variant="h3" color="error" sx={{mt: 2}} gutterBottom>
            Oops - we could not find what you are looking for
        </Typography>
        <Button fullWidth variant="contained" color="primary" onClick={() => navigate('/activities')} sx={{mt: 4}}>
            Go back to activities page
        </Button>

    </Paper>
  )
}