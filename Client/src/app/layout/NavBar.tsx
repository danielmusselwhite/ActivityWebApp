import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from '@mui/material'
import { Group } from "@mui/icons-material"
import { NavLink } from 'react-router'
import MenuItemLink from '../app/shared/components/MenuItemLink'

export default function NavBar() {
  return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundImage: 'linear-gradient(135deg, #15635f 0%, #21ae84 69%, #20ac66 89%)'}}>
            <Container maxWidth='xl'>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box>
                        <MenuItemLink to='/'>
                            <Group fontSize="large" />
                            <Typography variant="h4" fontWeight="bold">My Activities WebApp</Typography>
                        </MenuItemLink>
                    </Box>

                    <Box sx={{display: 'flex'}}>
                        <MenuItemLink to='/activities'>
                            <Typography fontSize="1.2rem" fontWeight="bold" textTransform="uppercase">Activities</Typography>
                        </MenuItemLink>

                        <MenuItemLink to='/createActivity'>
                            <Typography fontSize="1.2rem" fontWeight="bold" textTransform="uppercase" >Create Activity</Typography>
                        </MenuItemLink>

                        <MenuItemLink to='/counter'>
                            <Typography fontSize="1.2rem" fontWeight="bold" textTransform="uppercase" >Counter</Typography>
                        </MenuItemLink>
                    </Box>
                        <MenuItem>
                            <Typography fontSize="1.2rem" fontWeight="bold" textTransform="uppercase" >ToDo - UserMenu</Typography>
                        </MenuItem>
                </Toolbar>
            </Container>
        </AppBar>
        </Box>
  )
}


