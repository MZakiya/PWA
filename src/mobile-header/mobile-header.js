import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ZumenImg from '../images/app_bar_image.png';
import { getUserInfoFromLocalStorage } from '../utils/localstorage';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios';
import './mobile-header.css';
import { LOGOUT_URL } from '../constants';
import { useNavigate } from 'react-router-dom';
const MobileHeader = () => {
    const [userAvatar, setUserAvatar] = useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        let avatar = getUserInfoFromLocalStorage('avatar');
        setUserAvatar(avatar);
    })

    const handleLogout = async () => {
        try {
            let userId = getUserInfoFromLocalStorage('userId');
            let token = getUserInfoFromLocalStorage('token');
            let tenant = getUserInfoFromLocalStorage('tenant') || 'default';
            const response = await axios({
              method: "delete",
              url: LOGOUT_URL + userId,
              headers: { "Content-Type": "application/json", tenant, 'Authorization': 'Bearer ' + token },
            })
            console.log(response);
        } catch(e) {
            console.log(e);
        } finally {
            localStorage.removeItem('user_info');
            navigate('/');
        }
    }

    return (
        <div className='mobile-header-container'>
            <div>
                <img src={ZumenImg} />
            </div>
            <div className='avatar-container'>
                <Avatar alt="" src={userAvatar ? userAvatar : Avatar} onClick={handleClickOpen} />
            </div>

            {/* logout confirm dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Logout"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleLogout} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default MobileHeader;