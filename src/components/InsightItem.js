import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from './material-ui/Paper';
import Menu from './material-ui/Menu';
import {Visualization} from '@gooddata/react-components';

// use PureComponent to avoid re-render 'Visualization'
class InsightItem extends PureComponent {
    render() {
        const {projectId, uri, identifier, onEdit, onDelete} = this.props;
        return (
            <Grid item xs={6}>
                <Paper>
                    <Menu uri={uri} identifier={identifier} onEdit={onEdit} onDelete={onDelete}/>
                    <div className="insight-item">
                        <Visualization
                            projectId={projectId}
                            uri={uri}
                            identifier={identifier}
                            config={{
                                legend: {
                                    enabled: false,
                                    position: 'right'
                                }
                            }}
                        />
                    </div>
                </Paper>
            </Grid>
        );
    }
}

export default InsightItem;