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
    <div className="joinOuterContainer">
      <form onSubmit={handleSubmit} name={name}>
        {/* SIGN UP FORM */}
        {name === 'signup' && (
          <div>
            <div>
              <h1 className="heading">Become a Host</h1>
              <label htmlFor="hostName">
                <medium>Name</medium>
              </label>
              <input name="hostName" type="text" />
            </div>
            <div>
              <label htmlFor="profilePicture">
                <medium>Choose a Profile Picture</medium>
              </label>
              <input
                name="profilePicture"
                type="file"
                accept="image/*"
                multiple="false"
              />
            </div>
          </div>
        )}
        {/* SIGN UP & LOGIN FORM */}
        <div>
          <h1 className="heading">Join as Host</h1>
          <label htmlFor="email">
            <medium>Email</medium>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <medium>Password</medium>
          </label>
          <input name="password" type="password" />
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

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error
//   }
// }

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

// const mapDispatchSignup = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       const hostName = evt.target.hostName.value
//       const profilePicture = evt.target.profilePicture.value
//       dispatch(auth(email, password, formName, hostName, profilePicture))
//     }
//   }
// }

export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatchSignup)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
