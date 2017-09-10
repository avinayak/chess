import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ImageAddToPhotos from 'material-ui/svg-icons/image/add-to-photos';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';

class Header extends Component {

    constructor(props){
        super(props);
    }

    render() {

        const rightButtons = (
            <div>
                <IconButton onClick={this.props.requestOpenNewGame}><svg style={{'width':'24px','height':'24px'}} viewBox="0 0 24 24">
    <path fill="#000000" d="M3,3H21V21H3V3M5,5V12H12V19H19V12H12V5H5Z" fill="#333" />
</svg></IconButton>
                <IconButton><ActionVisibility /></IconButton>
                <IconMenu
                    iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    iconStyle={{ fill: 'rgba(0, 0, 0, 0.87)' }}>
                    <MenuItem primaryText="Settings" />
                    <MenuItem primaryText="Toggle Day/Night" />
                    <MenuItem primaryText="About" />
                </IconMenu>
            </div>
        );


        return (<AppBar
            title="Chess" zDepth={0}
            iconElementRight={rightButtons}
        />)
    }
}

export default Header;