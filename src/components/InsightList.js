import React from 'react';
import Grid from '@material-ui/core/Grid';
import InsightItem from './InsightItem';


const InsightList = ({projectId, insights, onEdit, onDelete}) => {
    return (
        <Grid container spacing={16}>
            {insights.map(({key, uri}) => (
                <InsightItem key={key} uri={uri} projectId={projectId} onEdit={onEdit} onDelete={onDelete}/>
            ))}
        </Grid>
    );
};

export default InsightList;