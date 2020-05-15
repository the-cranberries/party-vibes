import React from 'react'
import Chat from './Chat'

const Room = props => {
  const guests = [
    {
      id: 1,
      name: 'Cody',
      profilePicture: '../../pug.jpg'
    },
    {
      id: 2,
      name: 'Budy',
      profilePicture: '../../pug.jpg'
    },
    {
      id: 3,
      name: 'Louis',
      profilePicture: '../../pug.jpg'
    }
  ]

  return (
    <div>
      <div>
        <main>
          <h1 className="heading">Welcome to Cody's Party!</h1>
        </main>
      </div>
      <div>
        <Chat />
      </div>
      <div className="guests">
        {guests.map(guest => {
          return (
            <div key={guest.id}>
              <h4>{guest.name}</h4>
              <img src={guest.profilePicture} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Room
