import React from 'react';
import {
    AppBar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    toolbar: {
        justifyContent: 'space-between',
    },
});

const options = ['first', 'second', 'third'];

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky">
            <Toolbar className={classes.toolbar}>
                <Box display="flex" flexDirection="row">
                    <EmojiPeopleIcon />
                    <Typography variant="h5">Employee App</Typography>
                </Box>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option}
                            selected={option === 'first'}
                            onClick={handleClose}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
