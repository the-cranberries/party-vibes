import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit} name={name}>
        {/* SIGN UP FORM */}
        {name === 'signup' && (
          <div className="joinOuterContainer">
            <h1 className="heading">Become a Host</h1>
            <div className="row form-width mx-auto">
              <label className="col-sm-3" htmlFor="hostName">
                <medium>Name</medium>
              </label>
              <input
                className="form-control col-sm-9"
                name="hostName"
                type="text"
              />
            </div>
            <br />
            <div className="row form-width mx-auto">
              <label className="col-sm-3" htmlFor="profilePicture">
                <medium>Choose a Profile Picture</medium>
              </label>
              <input
                className="form-control col-sm-9"
                name="profilePicture"
                type="file"
                accept="image/*"
                multiple="false"
              />
            </div>
          </div>
        )}
        {/* SIGN UP & LOGIN FORM */}
        <div className="joinOuterContainer">
          <h1 className="heading">Join as Host</h1>
          <div className="row form-width mx-auto">
            <label className="col-sm-3" htmlFor="email">
              <medium>Email</medium>
            </label>
            <input className="form-control col-sm-9" name="email" type="text" />
          </div>
          <br />
          <div className="row form-width mx-auto">
            <label className="col-sm-3" htmlFor="password">
              <medium>Password</medium>
            </label>
            <input
              className="form-control col-sm-9"
              name="password"
              type="password"
            />
          </div>
          <br />
          <div className="row">
            <div className="col">
              <button className="btn purple-btn" type="submit">
                {displayName}
              </button>
            </div>
          </div>
          {error &&
            error.response && (
              <div id="errorMessage">
                <br /> {error.response.data}{' '}
              </div>
            )}
        </div>
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchLogin = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

const mapDispatchSignup = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const hostName = evt.target.hostName.value
      const profilePicture = evt.target.profilePicture.value
      dispatch(auth(email, password, formName, hostName, profilePicture))
    }
  }
}

export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignup)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
