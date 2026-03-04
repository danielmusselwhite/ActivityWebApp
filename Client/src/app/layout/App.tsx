import { CssBaseline, Container, Box } from '@mui/material';
import NavBar from './NavBar';
import { Outlet } from 'react-router';

function App() {
  
  return (
    <Box sx={{backgroundImage: 'linear-gradient(135deg, #73a09b 0%, #a1d4c4 69%, #c4f3dc 89%)'}} minHeight="100vh">
      <CssBaseline/>
      <NavBar />
      <Container maxWidth='xl' sx={{mt: 3}}>
        <Outlet /> {/* when we browse to a specific route, tjhe componenet that we route to replaces this outlet */}
      </Container>
    </Box>
  )
}

export default App;