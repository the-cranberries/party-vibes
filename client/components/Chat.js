import React from 'react'
// import socket from './../server/socket';

export class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
    this.updateMessage = this.updateMessage.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  updateMessage(evt) {
    this.setState({message: evt.target.value})
  }

  sendMessage() {
    let {message} = this.state
    if (message) {
      socket.emit('chat message', message)
      this.setState({message: ''})
    }
  }

  render() {
    const chatbox = function() {
      socket = io()
      'form'.submit(function(e) {
        e.preventDefault() // prevents page reloading
        socket.emit('chat message', '#m'.val())
        '#m'.val('')
        return false
      })
      socket.on('chat message', function(msg) {
        '#messages'.append('<li>'.text(msg))
      })
    }

    return (
      <div>
        <form action="">
          <input id="m" autoComplete="off" />
          <button>Send</button>
        </form>
      </div>
    )
  }
}

// const mapStateToProps = ({ messages, gameState }) => ({ messages, gameState });

// const mapDispatchToProps = dispatch => ({
//   start: () => dispatch(startChat()),
//   stop: () => dispatch(stopChat())
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Chat);
