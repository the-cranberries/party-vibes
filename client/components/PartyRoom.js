import React, {useState, useEffect} from 'react'
import socket from '../socket'
import Chat from './Chat'
import UserList from './UserList'
import session from 'express-session'
import {Link} from 'react-router-dom'

const Room = props => {
  const [users, setUsers] = useState('')

  window.addEventListener('beforeunload', function(e) {
    e.preventDefault()
    e.returnValue =
      'Leaving or resfreshing page will result in chat messages to dissaper: Are you sure you want to continue?'
  })

  const name = sessionStorage.name
  const key = props.match.params
  const room = Object.values(key)[0]
  sessionStorage.setItem('party', room)

  socket.emit('join', {name, room}, error => {
    if (error) {
      console.log(error)
    }
  })

  socket.on('roomData', ({users}) => {
    setUsers(users)
  })

  if (sessionStorage.length <= 1) {
    return (
      <div>
        <div className="joinOuterContainer">
          <main>
            <h1 className="heading">Need to login before entering party</h1>
          </main>
        </div>
        <div>
          <Link to="/guestLogin">
            <button type="button">Guest Login</button>
          </Link>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <main>
            <h1 className="heading">Welcome to Cody's Party!</h1>
            {/* <Link to="/">
            <button type="submit" onSubmit={sessionStorage.clear()}>
              Sign Out
            </button>
          </Link> */}
          </main>
        </div>
        <div>
          <Chat />
        </div>
        <div className="guests">
          <UserList users={users} />
        </div>
      </div>
    )
  }
}

export default Room

// import React from 'react'
// import Chat from './Chat'

// const Room = props => {
//   return (
//     <div>
//       <div>
//         <main>
//           <h1 className="heading">Welcome to Cody's Party!</h1>
//         </main>
//       </div>
//       <div>
//         <Chat />
//       </div>
//       <div className="guests">
//         <div key="guest">
//           <h4>{sessionStorage.name}</h4>
//           <img src="../../pug.jpg" />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Room

// socket.emit('ADD_USER', {
//   author: sessionStorage.name,
// })

// const addUsers = data => {
//   console.log('data', data)
//   this.setState({users: [...this.state.user, data]})
// }
