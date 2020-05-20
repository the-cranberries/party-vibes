import React from 'react'
import {Link} from 'react-router-dom'
// import {Login} from './HostLogin'
// import {Signup} from './Signup'

const Home = () => {
  return (
    <div className="">
      <main className="container text-center">
        <div className="row">
          <div className="col">
            <Link className="linkBtn" to="/signup">
              Become a Host
            </Link>
          </div>
          <div className="col">
            <Link className="linkBtn" to="/login">
              Login as a Host
            </Link>
          </div>
        </div>
        <div className="row justify-content-center">
          <Link className="linkBtn" to="/guestlogin">
            Join as a Guest
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home
