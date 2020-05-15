import React from 'react'
import io from 'socket.io-client'

export class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // username: '',
      message: '',
      messages: []
    }
    this.socket = io('localhost:8080')

    this.socket.on('RECEIVE_MESSAGE', function(data) {
      addMessage(data)
    })

    const addMessage = data => {
      console.log(data)
      this.setState({messages: [...this.state.messages, data]})
      console.log(this.state.messages)
    }

    this.sendMessage = evt => {
      evt.preventDefault()
      this.socket.emit('SEND_MESSAGE', {
        // author: this.state.username,
        message: this.state.message
      })
      this.setState({message: ''})
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.messages.map(message => {
            return <div>{message.message}</div>
          })}
        </div>
        <form>
          <input
            type="text"
            placeholder="Type a message..."
            value={this.state.message}
            onChange={evt => this.setState({message: evt.target.value})}
          />
          <button type="submit" onClick={this.sendMessage}>
            Send
          </button>
        </form>
      </div>
    )
  }
}

export default Chat
