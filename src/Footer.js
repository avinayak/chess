import React, { Component } from 'react';
import ContentUndo from 'material-ui/svg-icons/content/undo';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <span className="timer">&#9632; 08:34</span>
                <FloatingActionButton iconStyle={{ fill: '#333' }}>
                    <ContentUndo />
                </FloatingActionButton>
                <span className="timer" style={{opacity:0.5}}>&#9633; 04:10</span>
            </div>
        )
    }
}

export default Footer;