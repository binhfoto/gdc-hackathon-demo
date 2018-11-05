import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from './material-ui/Paper';
import Menu from './material-ui/Menu';
import {Visualization} from '@gooddata/react-components';


export default ({projectId, uri}) => {
    return (
        <Grid item xs={6}>
            <Paper>
                <Menu/>
                <div className="insight-item">
                    <Visualization
                        projectId={projectId}
                        uri={uri}
                        config={{legend: {position: 'bottom'}}}
                    />
                </div>
            </Paper>
        </Grid>
    );
};