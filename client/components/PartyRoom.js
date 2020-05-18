import React, {useState, useEffect} from 'react'
import socket from '../socket'
import Chat from './Chat'
import UserList from './UserList'

const Room = props => {
  const [users, setUsers] = useState('')

  const name = sessionStorage.name
  const key = props.match.params
  const room = Object.values(key)[0]

  socket.emit('join', {name, room}, error => {
    if (error) {
      console.log(error)
    }
  })

  socket.on('roomData', ({users}) => {
    setUsers(users)
  })

  return (
    <div>
      <div>
        <main>
          <h1 className="heading text-center">Welcome to Cody's Party!</h1>
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
