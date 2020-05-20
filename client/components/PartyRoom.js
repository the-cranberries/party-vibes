import React, {useState, useEffect} from 'react'
import socket from '../socket'
import Chat from './Chat'
import UserList from './UserList'
import session from 'express-session'
import {Link} from 'react-router-dom'

const Room = props => {
  console.log('Room PROPS', props)

  const [users, setUsers] = useState('')

  const pic = sessionStorage.getItem('picture')
  const name = sessionStorage.name
  const key = props.match.params
  const room = Object.values(key)[0]
  const picture = `${pic}.png`
  sessionStorage.setItem('party', room)

  socket.emit('join', {name, room, picture}, error => {
    if (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    socket.on('roomData', ({users}) => {
      setUsers(users)
    })
  }, [])

  const handleSubmit = () => {
    socket.emit('guestSignOut', {name, room, picture}, error => {
      if (error) {
        console.log(error)
      }
    })
    sessionStorage.clear()
  }

  if (sessionStorage.length <= 1) {
    return (
      <div>
        <div className="joinOuterContainer">
          <main>
            <h1 className="heading text-center">
              Need to login before entering party
            </h1>
          </main>
        </div>
        <div>
          <Link to="/guestLogin">
            <button className="btn aqua-btn" type="button">
              Guest Login
            </button>
          </Link>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <main>
            <h1 className="heading text-center">Welcome to Cody's Party!</h1>
            <Link to="/">
              <button
                className="btn aqua-btn"
                type="submit"
                onClick={handleSubmit}
              >
                Sign Out
              </button>
            </Link>
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

// const Room = props => {
//   const [users, setUsers] = useState('')
//   console.log('PROPS', props)

//   window.addEventListener('beforeunload', function(e) {
//     e.preventDefault()
//     e.returnValue =
//       'Leaving or resfreshing page will result in chat messages to dissaper: Are you sure you want to continue?'
//   })

//   const name = sessionStorage.name
//   const key = props.match.params
//   const room = Object.values(key)[0]
//   sessionStorage.setItem('party', room)

//   socket.emit('join', {name, room}, error => {
//     if (error) {
//       console.log(error)
//     }
//   })

//   socket.on('roomData', ({users}) => {
//     setUsers(users)
//   })

//   const handleSignOut = (event) => {
//     // event.preventDefault()
//     sessionStorage.clear()
//   }

//   if (sessionStorage.length <= 1) {
//     return (
//       <div>
//         <div className="joinOuterContainer">
//           <main>
//             <h1 className="heading">Need to login before entering party</h1>
//           </main>
//         </div>
//         <div>
//           <Link to="/guestLogin">
//             <button type="button">Guest Login</button>
//           </Link>
//         </div>
//       </div>
//     )
//   } else {
//     return (
//       <div>
//         <div>
//           <main>
//             <h1 className="heading">Welcome to Cody's Party!</h1>
//             {/* <Link to="/">
//               <button type="submit" onSubmit={handleSignOut()}>
//                 Sign Out
//               </button>
//             </Link> */}
//           </main>
//         </div>
//         <div>
//           <Chat />
//         </div>
//         <div className="guests">
//           <UserList users={users} />
//         </div>
//       </div>
//     )
//   }
// }

// export default Room

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
