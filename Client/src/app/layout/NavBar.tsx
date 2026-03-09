import { AppBar, Box, Button, Container, LinearProgress, MenuItem, Toolbar, Typography } from '@mui/material'
import { Group, Height } from "@mui/icons-material"
import MenuItemLink from '../app/shared/components/MenuItemLink'
import { useStore } from '../../lib/stores/useStore';
import { Observer } from 'mobx-react-lite';

export default function NavBar() {
    const {uiStore} = useStore();

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

            <Observer>
                {() => uiStore.isLoading 
                ? (
                    <LinearProgress color="success" sx={{position:'relative', bottom:0, left:0, right:0, height:4}}/>
                )
                : (
                    null
                )}
            </Observer>
        </AppBar>
        </Box>
  )
}


