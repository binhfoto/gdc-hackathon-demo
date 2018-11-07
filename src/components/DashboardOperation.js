import React from 'react';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {withStyles} from '@material-ui/core/styles';


const styles = {
    labelPlacementStart: {
        marginRight: 0
    }
};

const DashboardOperation = ({classes, enablePostMessage, onEnablePostMessageToggle, onNewInSight}) => {
    return (
        <div className="dashboard-operation">
            <div className="left-side">
                <Button size="small" variant="contained" color="primary" onClick={onNewInSight}>
                    New Insight
                </Button>
            </div>
            <div className="right-side">
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={enablePostMessage}
                                onChange={onEnablePostMessageToggle}
                                value={true}
                                color="primary"
                            />
                        }
                        label="Enable postMessage"
                        classes={{labelPlacementStart: classes.labelPlacementStart}}
                    />
                </FormGroup>
            </div>
        </div>
    );
};

export default withStyles(styles)(DashboardOperation);