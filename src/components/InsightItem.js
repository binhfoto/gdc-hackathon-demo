import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Visualization} from '@gooddata/react-components';

export default ({projectId, identifier, onOpen, onClose}) => {
    return (
        <Grid item xs={6}>
            <div style={{height: 350}}>
                <Visualization
                    projectId={projectId}
                    identifier={identifier}
                    config={{legend: {position: 'bottom'}}}
                />
            </div>
        </Grid>
    );
};