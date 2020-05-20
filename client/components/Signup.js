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
    <div className="joinOuterContainer">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <div>
            <h1 className="heading">Become a Host</h1>
            <label htmlFor="hostName">
              <h4>Name</h4>
            </label>
            <input name="hostName" type="text" required />
          </div>
        </div>
        <div>
          <label htmlFor="email">
            <h4>Email</h4>
          </label>
          <input name="email" type="text" required />
        </div>
        <div>
          <label htmlFor="password">
            <h4>Password</h4>
          </label>
          <input name="password" type="password" required />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error &&
          error.response && (
            <div id="errorMessage"> {error.response.data} </div>
          )}
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
