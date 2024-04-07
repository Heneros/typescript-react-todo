
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Header() {


    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav" >
                <Toolbar >
                    <Typography variant='h5' className='logo-title' component="div" sx={{ flexGrow: 1, }}>
                        <Link to={`/`} >
                            Tasks Manager 
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Typography variant='h5' className='logo-title' component="div" sx={{ flexGrow: 1 }}>
                    <Link to={`/`} >
                        Tasks Manager mobile
                    </Link>
                </Typography>
            </Box>

        </Box >
    )
}
