import React from 'react'
import {Link} from 'react-router-dom'
// import {Login} from './HostLogin'
// import {Signup} from './Signup'

const Home = () => {
  return (
    <div className="vertical-center justify-content-center">
      <main className="container text-center">
        <div className="row">
          <div className="col">
            <Link className="linkBtn" to="/signup">
              Sign Up
            </Link>
          </div>
          <div className="col">
            <Link className="linkBtn" to="/login">
              Login
            </Link>
          </div>
        </div>
        <div className="row justify-content-center">
          <Link className="linkBtn" to="/guestlogin">
            Join Party
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home
