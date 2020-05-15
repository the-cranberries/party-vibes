import React from 'react'
import Chat from './Chat'

const Room = props => {
  const guests = [
    {
      id: 1,
      name: 'Cody',
      profilePicture: ''
    },
    {
      id: 2,
      name: 'Budy',
      profilePicture: ''
    },
    {
      id: 3,
      name: 'Louis',
      profilePicture: ''
    }
  ]

  return (
    <div>
      <div>
        <main>
          <h1 className="heading">Welcome to Cody's Party!</h1>
        </main>
      </div>
      <Chat />
      {guests.map(guest => {
        return (
          <div key={guest.id} className="guest">
            <h4>{guest.name}</h4>
            <img src={guest.profilePicture} />
          </div>
        )
      })}
    </div>
  )
}

export default Room
