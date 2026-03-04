import { RoundedCorner } from "@mui/icons-material";
import { Card, Container, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container sx={{mt: 3}}>
        <Card sx={{RoundedCorner: 3, p:8 }}>
            <Typography variant="h1" sx={{ textAlign: "center" }}>Welcome</Typography>
        </Card>
    </Container>
  )
}