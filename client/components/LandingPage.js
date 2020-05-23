import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const Home = props => {
  if (props.user && props.user.id) {
    return <Redirect to="/dashboard" />
  }

  return (
    // <div className="">
    //   <img className="landingImg" src="/landing_page.jpg" />
    //   <main className="bottom text-center">
    //     <Link className="linkBtn" to="/signup">
    //       Sign Up
    //     </Link>
    //     <Link className="linkBtn" to="/login">
    //       Login
    //     </Link>
    //     <Link className="linkBtn" to="/guestlogin">
    //       Join Party
    //     </Link>
    //   </main>
    // </div>
    <div className="">
      <img className="landingImg" src="/landing_page.jpg" />

      <main className="bottom text-center">
        <div className="">
          <div className="row mx-auto w-50">
            <div className="col-sm-4 margin-link">
              <Link className="linkBtn" to="/signup">
                Sign Up
              </Link>
            </div>
            <div className="col-sm-4 margin-link">
              <Link className="linkBtn" to="/login">
                Login
              </Link>
            </div>
            <div className="col-sm-4 margin-link">
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
