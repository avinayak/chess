import React, { Component } from 'react';
import ContentUndo from 'material-ui/svg-icons/content/undo';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import AVPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AVFastRewind from 'material-ui/svg-icons/av/fast-rewind';
import AVFastForward from 'material-ui/svg-icons/av/fast-forward';

const aVPlayArrow = <AVPlayArrow />;
const aVFastForward = <AVFastForward />;
const aVFastRewind = <AVFastRewind />;

class Footer extends Component {

    state = {
        selectedIndex: 0,
    };

    select = (index) => this.setState({ selectedIndex: index });

    render() {
        return (
            <div>
                <p className="graveyard"><div id="graves">{this.props.fallenOnes}</div> </p>
                <div className="footer">
                    <Paper zDepth={10}>
                        <BottomNavigation zDepth={0}>
                            <BottomNavigationItem
                                label=" "
                                icon={aVFastRewind}
                                style={{ color: '#333' }}
                                onClick={() => { this.props.gotoPreviousState() }}
                            />
                            <BottomNavigationItem
                                label=" "
                                icon={aVPlayArrow}
                                style={{ color: '#333' }}
                                onClick={() => { this.props.playForHuman() }}
                            />
                            <BottomNavigationItem
                                label=" "
                                icon={aVFastForward}
                                style={{ color: '#333' }}
                                onClick={() => { this.props.gotoNextState() }}
                            />
                        </BottomNavigation>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default Footer;