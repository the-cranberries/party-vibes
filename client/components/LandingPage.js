import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import {Login, Signup} from './auth-form'

const Home = () => {
  return (
    <div>
      <main>
        <Link className="linkBtn" to="/signup">
          Become a Host
        </Link>
        <Link className="linkBtn" to="/guestlogin">
          Join as a Guest
        </Link>
        <Link className="linkBtn" to="/login">
          Login as a Host
        </Link>

        <Switch>
          <Route path="/signup" component={Signup} />
          {/* Add guest login component here */}
          <Route path="/login" component={Login} />
        </Switch>
      </main>
    </div>
  )
}

export default Home
