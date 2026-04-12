import { CssBaseline, Container, Box } from '@mui/material';
import NavBar from './NavBar';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';

function App() {
  const location = useLocation(); // get our URL
  
  return (
    <Box sx={{backgroundImage: 'linear-gradient(135deg, #73a09b 0%, #a1d4c4 69%, #c4f3dc 89%)'}} minHeight="100vh">
      <ScrollRestoration /> {/* this component will make sure that when we navigate to a different page, it will scroll to the top of the page */}
      <CssBaseline/>
      {location.pathname === '/'
        ? <HomePage />
        :
        <>
          <NavBar />
          <Container maxWidth='xl' sx={{mt: 3}}>
            <Outlet /> {/* when we browse to a specific route, the component that we route to replaces this outlet */}
          </Container>
        </>
      }
      
    </Box>
  )
}

export default App;