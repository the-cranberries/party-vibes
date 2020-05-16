import React from 'react'
import Chat from './Chat'

const Room = props => {
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
        <div key="guest">
          <h4>{sessionStorage.name}</h4>
          <img src="../../pug.jpg" />
        </div>
      </div>
    </div>
  )
}

export default Room
