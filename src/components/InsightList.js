import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid';
import InsightItem from './InsightItem';

// use PureComponent to avoid re-render 'Visualization'
class InsightList extends PureComponent {
    render() {
        const {projectId, insights, onEdit, onDelete} = this.props;
        return (
            <Grid container spacing={16}>
                {insights.map(({key, uri, identifier}) => (
                    <InsightItem
                        key={key}
                        uri={uri}
                        identifier={identifier}
                        projectId={projectId}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </Grid>
        );
    }
}

export default InsightList;