import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import LogOut from '../../../../../../components/LogOut';

export default function ProfileDropDown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userName = localStorage.getItem('user')
  const userEmail = localStorage.getItem('email')
  return (
    <div style={{ padding: 60 }}>

      <IconButton
        onClick={handleClick}
      >
        <AccountCircleIcon style={{ fontSize: 50 }} />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div style={{textAlign: 'center', padding: '0 16px', marginBottom: 10}}>
          <h3>{userName}</h3>
          <span>{userEmail}</span>
        </div>
        <MenuItem onClick={LogOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}