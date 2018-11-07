import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from './material-ui/Paper';
import {createReportUrl} from '../utils';

const EmbeddedAD = ({onClose, reportUrl = createReportUrl()}) => (
    <Paper>
        <Button size="small" variant="contained" color="primary" onClick={onClose} className='btn-finish'>
            Finish Editing
        </Button>
        <iframe
            id="gdc"
            title="Embedded AD"
            src={reportUrl}
            frameBorder="0"
            allowFullScreen
            width="100%"
            height="100%" // suggested height from help.gooddata.com
        >
        </iframe>
    </Paper>
);

export default EmbeddedAD;