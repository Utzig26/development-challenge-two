import {
  Box, 
  Toolbar,
  AppBar,
} from '@mui/material';

import MedCloudSvg from '../../assets/medcloud.svg'
import './style.css';

export function Header() {

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
