import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ImageAddToPhotos from 'material-ui/svg-icons/image/add-to-photos';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import LinearProgress from 'material-ui/LinearProgress';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const rightButtons = (
            <div>
                <IconButton onClick={this.props.requestOpenNewGame}><svg style={{ 'width': '24px', 'height': '24px' }} viewBox="0 0 24 24">
                    <path fill="#000000" d="M3,3H21V21H3V3M5,5V12H12V19H19V12H12V5H5Z" fill="#333" />
                </svg></IconButton>
                <IconButton><ActionVisibility /></IconButton>
                <IconButton><svg style={{ 'width': '24px', 'height': '24px' }} viewBox="0 0 24 24">
                    <path fill="#333" d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H11V13H9V11M15,11H17V13H19V11H21V13H19V15H21V19H19V21H17V19H13V21H11V17H15V15H17V13H15V11M19,19V15H17V19H19M15,3H21V9H15V3M17,5V7H19V5H17M3,3H9V9H3V3M5,5V7H7V5H5M3,15H9V21H3V15M5,17V19H7V17H5Z" />
                </svg></IconButton>
                <IconMenu
                    iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>
                    }
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    iconStyle={{ fill: 'rgba(0, 0, 0, 0.87)' }}>
                    <MenuItem primaryText="Settings" />
                    <MenuItem primaryText="Toggle Day/Night" />
                    <MenuItem primaryText="About" />
                </IconMenu>

            </div>
        );


        return (<div><AppBar title="Chess" zDepth={0} iconElementRight={rightButtons}></AppBar>
            {/* <LinearProgress mode="indeterminate"> </LinearProgress> */}
        </div>

        )
    }
}

export default Header;