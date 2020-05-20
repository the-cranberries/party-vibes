import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
// import {Login} from './HostLogin'
// import {Signup} from './Signup'

const Home = props => {
  if (props.user && props.user.id) {
    return <Redirect to="/dashboard" />
  }

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

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Home)
