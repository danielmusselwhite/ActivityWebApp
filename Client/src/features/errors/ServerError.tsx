import { Divider, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router";

export default function ServerError() {
    const { state } = useLocation();

  return (
        <Paper>
            {
                state?.error ? (
                    <>
                        <Typography variant="h3" color='error' gutterBottom sx={{pl:4, pt:4}}>
                            {state.error.message || 'There has been an error'}
                        </Typography>
                        <Divider />
                        <Typography variant="body1" sx={{p:4}}>
                            {state.error.details || 'Internal server error'}
                        </Typography>
                    </>
                ) : (
                    <Typography variant="h3" color='error' gutterBottom>
                        Server Error
                    </Typography>
                )
            } 
            
        </Paper>
  )
}