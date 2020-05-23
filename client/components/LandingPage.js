import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const Home = props => {
  if (props.user && props.user.id) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="">
      <img className="landingImg" src="/landing_page.jpg" />

      <main className="bottom text-center">
        <div className="activeContainer">
          <div className="row">
            <div className="activeItem text-center col">
              <Link className="linkBtn" to="/signup">
                Sign Up
              </Link>
            </div>
            <div className="activeItem text-center col">
              <Link className="linkBtn" to="/login">
                Login
              </Link>
            </div>
            <div className="activeItem text-center col">
              <Link className="linkBtn" to="/guestlogin">
                Join Party
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Home)
