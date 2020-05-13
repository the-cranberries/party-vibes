import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export default function SignIn() {
  const [name, setName] = useState('')
  const [picture, setPicture] = useState('')

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join a Party</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <input placeholder="Access Code" type="text" />
        </div>
        <div>
          <select
            placeholder="Profile Picture"
            type="image"
            onChange={event => setPicture(event.target.value)}
          />
        </div>
        {/* <Link
          onClick={e => (!name || !picture ? e.preventDefault() : null)}
          to={`/chat?name=${name}&picture=${picture}`}
        > */}
        <button type="submit">Let's vibe</button>
        {/* </Link> */}
      </div>
    </div>
  )
}
