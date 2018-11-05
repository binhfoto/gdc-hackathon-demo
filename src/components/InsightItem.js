import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Visualization} from '@gooddata/react-components';

export default ({projectId, uri}) => {
    return (
        <Grid item xs={6}>
            <div style={{height: 350}}>
                <Visualization
                    projectId={projectId}
                    uri={uri}
                    config={{legend: {position: 'bottom'}}}
                />
            </div>
        </Grid>
    );
};