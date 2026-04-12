import { AppBar, Box, Button, Container, LinearProgress, MenuItem, Toolbar, Typography } from '@mui/material'
import { Group, Height } from "@mui/icons-material"
import MenuItemLink from '../../app/shared/components/MenuItemLink'
import { useStore } from '../../lib/stores/useStore';
import { Observer } from 'mobx-react-lite';
import { useAccount } from '../../lib/hooks/useAccounts';
import Login from '../../features/account/LoginForm';
import UserMenu from './UserMenu';

export default function NavBar() {
    const {uiStore} = useStore();
    const {currentUser} = useAccount();

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
                        
                        <MenuItemLink to='/counter'>
                            <Typography fontSize="1.2rem" fontWeight="bold" textTransform="uppercase" >Counter</Typography>
                        </MenuItemLink>

                        <MenuItemLink to='/errors'>
                            <Typography fontSize="1.2rem" fontWeight="bold" textTransform="uppercase" >Errors</Typography>
                        </MenuItemLink>
                    </Box>
                    <Box display='flex' alignItems='center' gap={2}>
                        {currentUser ? 
                        (
                            <UserMenu />
                        ) : 
                        (
                            <>
                                <MenuItemLink to='/login'>Login</MenuItemLink>
                                <MenuItemLink to='/register'>Register</MenuItemLink>                            
                            </>  
                        )}
                    </Box>
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


