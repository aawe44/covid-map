import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import LoginDialog from './LoginDialog';
import cookie from "react-cookies";
// import { JWT_COOKIE_NAME } from '../constant';
// import RegisterDialog from './RegisterDialog';

import { GOOGLE_MAP_API_KEY } from '../constant';

export default function MenuBar() {


    let hasLoggedIn = !!cookie.load(GOOGLE_MAP_API_KEY);
    let buttonText = hasLoggedIn ? "Logout" : "Login"

    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {

        if (hasLoggedIn) {
            cookie.remove(GOOGLE_MAP_API_KEY);
            window.location.reload();
        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Covid19 Map
                    </Typography>

                    <Button color="inherit"> Auto Level </Button>
                    <Button color="inherit">County</Button>
                    <Button color="inherit">State</Button>
                    <Button color="inherit">Nation</Button>
                    <Button color="inherit" onClick={handleClickOpen}>{buttonText}</Button>

                </Toolbar>
            </AppBar>
            <LoginDialog open={open} handleClose={handleClose} />
        </Box>
    );
}
