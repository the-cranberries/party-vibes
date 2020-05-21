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
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Chat</div>
                <hr />
                <ScrollToBottom className="messages">
                  {this.state.messages.map((message, index) => {
                    return (
                      <div key={index}>
                        {message.author}: {message.message}
                      </div>
                    )
                  })}
                </ScrollToBottom>
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Message"
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
                <br />
                <button
                  onClick={this.sendMessage}
                  className="sendButton"
                  disabled={!this.state.message}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
