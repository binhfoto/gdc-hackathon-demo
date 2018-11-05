import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }, // Purple and green play nicely together.
    secondary: { main: pink[500] }, // This is just green.A700 as hex.
  },
});

const withTheme = (Component) => () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Component/>
        </MuiThemeProvider>
    );
};

export default withTheme;