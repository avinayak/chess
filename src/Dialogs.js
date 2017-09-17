import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Dialogs extends React.Component {
  constructor(props){
    super(props);
    this.state = {newGameDialogOpen:false,actionPressed:false};
  }
  handleClose = () => {
    this.setState({newGameDialogOpen: false,actionPressed:true});
  };

  render() {

      this.state.newGameDialogOpen = this.props.newGameDialogOpen;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        style={{color:"#333"}}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="OK"
        primary={true}
        style={{color:"#333"}}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog title="New Game" actions={actions} modal={false} open={this.state.newGameDialogOpen} onRequestClose={this.handleClose}>
          Start a New Game?
        </Dialog>
      </div>
    );
  }
}

export default Dialogs;