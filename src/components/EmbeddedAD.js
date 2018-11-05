import React from 'react';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import Paper from './material-ui/Paper';
const {hostname, projectId} = require('../config');

const EmbeddedAD = ({onClose}) => {
    const src = `https://${hostname}/analyze/embedded/#/${projectId}/reportId/edit`;
    return (
        <Paper>
            <Button
                mini
                aria-label="Close"
                onClick={onClose}
                color="secondary"
                variant="fab"
            >
                <Close/>
            </Button>
            <iframe
                id="gdc"
                src={src}
                frameBorder="0"
                allowFullScreen
                width="100%"
                height="800px"
            >
            </iframe>
        </Paper>
    );
};

export default EmbeddedAD;