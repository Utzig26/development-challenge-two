import AppBar from '@mui/material/AppBar';
import { Box, Toolbar } from '@mui/material';
import MedCloudSvg from '../../assets/medcloud.svg'

import './style.css';
function Header() {

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" color="complementary">
        <Toolbar className='header-body'>        
          <img src={MedCloudSvg} className='logo-icon' />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;