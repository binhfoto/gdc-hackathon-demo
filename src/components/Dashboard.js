import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import '@gooddata/react-components/styles/css/main.css';
import InsightList from './InsightList';
import EmbeddedAD from './EmbeddedAD';
import mockData from '../mock-data';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenAD: false,
            projectId: mockData.projectId || '',
            insights: mockData.insightIdentifiers.map((identifier, index) => ({identifier, key: index}))
        };
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Demo App
                        </Typography>
                    </Toolbar>
                </AppBar>
                {
                    this.state.isOpenAD ?
                        <EmbeddedAD/> :
                        <InsightList projectId={this.state.projectId} insights={this.state.insights}/>
                }
            </div>
        );
    }

}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);