import React from 'react';
import Grid from '@material-ui/core/Grid';
import InsightItem from './InsightItem';

const InsightList = ({classes, projectId, insights}) => {
    return (

        <Grid container spacing={8}>
            {insights.map(({key, identifier}) => (
                <InsightItem key={key} identifier={identifier} projectId={projectId}/>
            ))}
        </Grid>

    );
};

export default InsightList;