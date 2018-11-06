import React from 'react';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import Paper from './material-ui/Paper';

const EmbeddedAD = ({url, onClose}) => {
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
                title="Embedded AD"
                src={url}
                frameBorder="0"
                allowFullScreen
                width="100%"
                height="1100px"
            >
            </iframe>
        </Paper>
    );
};

export default EmbeddedAD;