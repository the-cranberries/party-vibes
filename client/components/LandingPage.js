import React from 'react'
import {Link} from 'react-router-dom'
// import {Login} from './auth-form'
// import {Signup} from './Signup'

const Home = () => {
  return (
    <div>
      <main>
        <Link className="linkBtn" to="/signup">
          Become a Host
        </Link>
        <Link className="linkBtn" to="/login">
          Login as a Host
        </Link>
        <Link className="linkBtn" to="/guestlogin">
          Join as a Guest
        </Link>
      </main>
    </div>
  )
}

export default Home
