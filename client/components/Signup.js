import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const SignupForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="text-center vertical-center justify-content-center">
      <form onSubmit={handleSubmit} name={name}>
        <div className="joinOuterContainer">
          <h1 className="heading">Become a Host</h1>
          <div className="row form-width mx-auto">
            <label className="col-sm-3" htmlFor="hostName">
              <span>Name</span>
            </label>
            <input
              className="form-control col-sm-9"
              name="hostName"
              type="text"
              required
            />
          </div>
          <br />
          <div className="row form-width mx-auto">
            <label className="col-sm-3" htmlFor="email">
              <span>Email</span>
            </label>
            <input
              className="form-control col-sm-9"
              name="email"
              type="text"
              required
            />
          </div>
          <br />
          <div className="row form-width mx-auto">
            <label className="col-sm-3" htmlFor="password">
              <span>Password</span>
            </label>
            <input
              className="form-control col-sm-9"
              name="password"
              type="password"
              required
            />
          </div>
          <br />
          <div className="row">
            <div className="col">
              <button className="btn yellow-orange-btn" type="submit">
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

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
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
      dispatch(auth(email, password, formName, hostName))
    }
  }
}

export default connect(mapSignup, mapDispatchSignup)(SignupForm)

/**
 * PROP TYPES
 */
SignupForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
