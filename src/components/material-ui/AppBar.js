import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu/Menu';
import User from '../../services/user.service';

const styles = {
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
};

class MyAppBar extends Component {

    state = {
        anchorEl: null
    };

    openMenu(evt) {
        this.setState({ anchorEl: evt.currentTarget });
    }

    closeMenu() {
        this.setState({ anchorEl: null });
    }

    logout() {
        User.logout()
            .then(window.location.href = 'account.html');
    }

    render() {
        const { classes } = this.props;
        const {
            anchorEl
        } = this.state;
        const open = Boolean(anchorEl);
        const userName = User.getFullName();

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        LOL2 - Hackathon Demo
                    </Typography>
                    <div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={this.openMenu.bind(this)}>
                            <AccountCircle />
                        </IconButton>
                        <span className='user-name'>{userName}</span>
                        <Menu id="menu-appbar"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={this.closeMenu.bind(this)}>
                            <MenuItem onClick={this.logout.bind(this)}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(MyAppBar);