import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
    secondary: { main: pink[500] },
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