import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


class MyMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleOpenMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleCloseMenu = () => {
        this.setState({anchorEl: null});
    };

    handleEditClick = () => {
        this.handleCloseMenu();
        this.props.onEdit(this.props.uri);
    };

    handleDeleteClick = () => {
        this.handleCloseMenu();
        this.props.onDelete(this.props.uri);
    };

    render() {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className="menu-icon">
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleOpenMenu}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    id="insight-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleCloseMenu}
                >
                    <MenuItem onClick={this.handleEditClick}>Edit</MenuItem>
                    <MenuItem onClick={this.handleDeleteClick}>Delete</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default MyMenu;