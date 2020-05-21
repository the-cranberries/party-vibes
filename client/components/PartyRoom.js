import React, {useState, useEffect} from 'react'
import socket from '../socket'
import Chat from './Chat'
import UserList from './UserList'
// import session from 'express-session'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  putUser,
  fetchUserParty,
  postUserParty,
  endUserParty
} from '../store/user'

const Room = props => {
  // console.log('Room PROPS', props.user)

  const [users, setUsers] = useState('')
  const [isPartyGoing, setParty] = useState('')

  const pic = sessionStorage.getItem('picture')
  const name = sessionStorage.name
  const key = props.match.params
  const room = Object.values(key)[0]
  const picture = `${pic}`
  sessionStorage.setItem('party', room)

  let isHost = JSON.parse(sessionStorage.getItem('isHost'))

  socket.emit('join', {name, room, picture}, error => {
    if (error) {
      console.log(error)
    }
  })

  socket.on('LEAVE_PARTY', () => {
    sessionStorage.clear()
    props.deleteParty(props.user.id)
    props.history.push('/')
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

  const handleReload = () => {
    window.location.reload()
  }

  const endParty = () => {
    // eslint-disable-next-line no-alert
    if (confirm('Are you sure you want to end party for all?')) {
      socket.emit('END_PARTY', {room})
    }
  }

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
            <div>
              <h1 className="heading">Welcome to {props.user.name}'s Party!</h1>
            </div>
            {isHost ? (
              <button type="button" onClick={endParty}>
                End Party
              </button>
            ) : (
              <Link to="/">
                <button type="submit" onClick={handleSubmit}>
                  Sign Out
                </button>
              </Link>
            )}
          </main>
          <div>
            <Chat />
          </div>
          <div className="guests">
            <UserList users={users} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  deleteParty: userId => dispatch(endUserParty(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Room)
