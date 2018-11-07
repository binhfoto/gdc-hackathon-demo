import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const styles = {
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

const MyAppBar = (props) => (
    <AppBar position="static">
        <Toolbar>
            <IconButton className={props.classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit" className={props.classes.grow}>
                Hackathon Demo
            </Typography>
        </Toolbar>
    </AppBar>
);

export default withStyles(styles)(MyAppBar);
