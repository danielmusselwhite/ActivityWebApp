import { Grid, Typography } from "@mui/material";

export default function PhotoUploadWidget() {
    return (
        <Grid container spacing={3}>
            
            <Grid size={4}>
                <Typography variant="overline" color="secondary">Step 1 - Add Photo</Typography>
            </Grid>
            <Grid size={4}>
                <Typography variant="overline" color="secondary">Step 2 - Resize Photo</Typography>
            </Grid>
            <Grid size={4}>
                <Typography variant="overline" color="secondary">Step 3 - Preview & Upload Photo</Typography>
            </Grid>

        </Grid>
    )
}