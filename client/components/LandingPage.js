import React from 'react'
import {Link} from 'react-router-dom'
// import {Login} from './HostLogin'
// import {Signup} from './Signup'

const Home = () => {
  return (
    <div>
      <main>
        <Link className="linkBtn" to="/signup">
          Sign Up
        </Link>
        <Link className="linkBtn" to="/login">
          Login
        </Link>
        <Link className="linkBtn" to="/guestlogin">
          Join Party
        </Link>
      </main>
    </div>
  )
}

export default Home
