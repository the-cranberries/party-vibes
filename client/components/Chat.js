import React from 'react'
import socket from '../socket'
import ScrollToBottom from 'react-scroll-to-bottom'

class Chat extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      messages: []
    }

    this.state.messages = JSON.parse(sessionStorage.getItem('chat') || '[]')

    // socket = io('localhost:8080')

    const addMessage = data => {
      let messages = [...this.state.messages, data]
      if (messages.length > 100) {
        messages = messages.slice(50)
        sessionStorage.setItem('chat', JSON.stringify(messages))
        this.setState({messages})
      } else {
        sessionStorage.setItem('chat', JSON.stringify(messages))
        this.setState({messages})
      }
    }

    socket.on('RECEIVE_MESSAGE', ({author, message}) => {
      let data = {author, message}
      addMessage(data)
    })

    this.sendMessage = ev => {
      // ev.preventDefault()
      socket.emit('SEND_MESSAGE', {
        author: sessionStorage.name,
        message: this.state.message,
        room: sessionStorage.party
      })
      this.setState({message: ''})
    }
  }

  render() {
    return (
      <div className="chat-box">
        <h4 className="yellow-orange font-weight-bold">Chat</h4>
        <div className="chat-container">
          <ScrollToBottom className="messages">
            {this.state.messages.map((message, index) => {
              return (
                <div key={index}>
                  <b className="yellow-orange">{message.author}</b>:{' '}
                  {message.message}
                </div>
              )
            })}
          </ScrollToBottom>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              className="form-control"
              required="required"
              value={this.state.message}
              onChange={ev => this.setState({message: ev.target.value})}
              onKeyPress={evt => {
                if (this.state.message) {
                  if (evt.key === 'Enter') {
                    this.sendMessage()
                  }
                }
              }}
            />
            <button
              type="submit"
              onClick={this.sendMessage}
              className="sendButton"
              disabled={!this.state.message}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
