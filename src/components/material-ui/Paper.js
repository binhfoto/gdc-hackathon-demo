import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function MyPaper(props) {
  const { classes, children } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
          {children}
      </Paper>
    </div>
  );
}

MyPaper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyPaper);