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
                <IconButton>




                    <svg width="24" height="24" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <path d="M0,15.089434 C0,16.3335929 5.13666091,24.1788679 14.9348958,24.1788679 C24.7325019,24.1788679 29.8697917,16.3335929 29.8697917,15.089434 C29.8697917,13.8456167 24.7325019,6 14.9348958,6 C5.13666091,6 0,13.8456167 0,15.089434 Z" id="outline"></path>
                            <mask id="mask">
                                <rect width="100%" height="100%" fill="white"></rect>
                                <use href="#outline" id="lid" fill="black" />
                            </mask>
                        </defs>
                        <g id="eye">
                            <path d="M0,15.089434 C0,16.3335929 5.13666091,24.1788679 14.9348958,24.1788679 C24.7325019,24.1788679 29.8697917,16.3335929 29.8697917,15.089434 C29.8697917,13.8456167 24.7325019,6 14.9348958,6 C5.13666091,6 0,13.8456167 0,15.089434 Z M14.9348958,22.081464 C11.2690863,22.081464 8.29688487,18.9510766 8.29688487,15.089434 C8.29688487,11.2277914 11.2690863,8.09740397 14.9348958,8.09740397 C18.6007053,8.09740397 21.5725924,11.2277914 21.5725924,15.089434 C21.5725924,18.9510766 18.6007053,22.081464 14.9348958,22.081464 L14.9348958,22.081464 Z M18.2535869,15.089434 C18.2535869,17.0200844 16.7673289,18.5857907 14.9348958,18.5857907 C13.1018339,18.5857907 11.6162048,17.0200844 11.6162048,15.089434 C11.6162048,13.1587835 13.1018339,11.593419 14.9348958,11.593419 C15.9253152,11.593419 14.3271242,14.3639878 14.9348958,15.089434 C15.451486,15.7055336 18.2535869,14.2027016 18.2535869,15.089434 L18.2535869,15.089434 Z" fill="#333"></path>
                            <use href="#outline" mask="url(#mask)" fill="#333" />
                        </g>
                    </svg>






                </IconButton>
                {/* <IconButton><svg style={{ 'width': '24px', 'height': '24px' }} viewBox="0 0 24 24">
                    <path fill="#333" d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H11V13H9V11M15,11H17V13H19V11H21V13H19V15H21V19H19V21H17V19H13V21H11V17H15V15H17V13H15V11M19,19V15H17V19H19M15,3H21V9H15V3M17,5V7H19V5H17M3,3H9V9H3V3M5,5V7H7V5H5M3,15H9V21H3V15M5,17V19H7V17H5Z" />
                </svg></IconButton> */}
                
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
            <LinearProgress id="thinking-bar" style={{backgroundColor:"#333"}} mode="indeterminate"> </LinearProgress>
        </div>

        )
    }
}

export default Header;