import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from '@mui/material'
import { Group } from "@mui/icons-material"


export default function NavBar() {
  return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundImage: 'linear-gradient(135deg, #15635f 0%, #21ae84 69%, #20ac66 89%)'}}>
            <Container maxWidth='xl'>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box>
                        <MenuItem sx={{display: 'flex', gap:2}}>
                            <Group fontSize="large" />
                            <Typography variant="h4" fontWeight="bold">My Activities WebApp</Typography>
                        </MenuItem>
                    </Box>

                    <Box sx={{display: 'flex'}}>
                        <MenuItem sx={{display: 'flex', gap:2}}>
                            <Typography fontSize="1.2rem" fontWeight="bold" textTransform="uppercase">Activities</Typography>
                        </MenuItem>

                        <MenuItem sx={{display: 'flex', gap:2}}>
                            <Typography fontSize="1.2rem" fontWeight="bold" textTransform="uppercase">About</Typography>
                        </MenuItem>

                        <MenuItem sx={{display: 'flex', gap:2}}>
                            <Typography fontSize="1.2rem" fontWeight="bold" textTransform="uppercase">Contact</Typography>
                        </MenuItem>
                    </Box>
                    <Button size="large" variant="contained" color="warning">Create Activity</Button>
                </Toolbar>
            </Container>
        </AppBar>
        </Box>
  )
}


