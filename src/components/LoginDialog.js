import * as React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { AuthService } from '../service/AuthService';

import { Link, TextField } from "@mui/material";

import cookie from "react-cookies";
// import { JWT_COOKIE_NAME } from "../constant"

export default function LoginDialog(props) {

    const [errorMsg, setErrorMsg] = React.useState("");

    let password;

    const login = () => {

        if (props.googleMapApiKey === "") {
            props.googleMapApiKey = password;
        }
        window.location.reload();
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Please Enter Username and Password</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(event => password = event.target.value)}
                    />

                    <DialogContentText style={{ "color": "red" }}>
                        {errorMsg}
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={login}>Login</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
