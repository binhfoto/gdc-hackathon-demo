import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

const styles = {
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    addButton: {

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
            <IconButton className={props.classes.addButton} color="inherit" aria-label="Add"
                onClick={props.addNewInsight}>
                <AddIcon />
            </IconButton>
        </Toolbar>
    </AppBar>
);

export default withStyles(styles)(MyAppBar);