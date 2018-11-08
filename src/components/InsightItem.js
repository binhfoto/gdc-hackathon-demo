import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from './material-ui/Paper';
import Menu from './material-ui/Menu';
import {Visualization} from '@gooddata/react-components';


export default ({projectId, uri, identifier, onEdit, onDelete}) => {
    return (
        <Grid item xs={6}>
            <Paper>
                <Menu uri={uri} identifier={identifier} onEdit={onEdit} onDelete={onDelete}/>
                <div className="insight-item">
                    <Visualization
                        projectId={projectId}
                        uri={uri}
                        identifier={identifier}
                        config={{legend: {
                            enabled: false,
                            position: 'right'
                        }}}
                    />
                </div>
            </Paper>
        </Grid>
    );
};