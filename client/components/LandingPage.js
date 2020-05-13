import React from 'react'
import {Route, Switch, Link, Redirect} from 'react-router-dom'
import {Login, Signup} from './auth-form'

const Home = () => {
  return (
    <div>
      <main>
        {/* <button type="button">Become a Host</button>
        <button type="button">Join as a Host</button>
        <button type="button">Join as a Guest</button> */}

        <Link to="/signup">Become a Host</Link>
        <Link to="/parties/">Join as a Guest</Link>
        <Link to="/login">Join as a Host</Link>

        <Switch>
          <Route path="/signup" component={Signup} />
          {/* <Route path='' component={}/> */}
          <Route path="/login" component={Login} />
        </Switch>
      </main>
    </div>
  )
}

export default Home
