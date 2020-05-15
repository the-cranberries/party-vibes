import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchParty} from '../store/party'
import PropTypes from 'prop-types'

const initialState = {
  name: '',
  accessCode: ''
  // error: ''
}

export class GuestLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // componentDidMount() {
  //   this.props.fetchParty()
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.fetchParty({
      accessCode: this.state.accessCode,
      name: this.state.name
    })
  }

  render() {
    // console.log('guest login state: ', this.state)
    const {error} = this.props
    // console.log('ERRROOOOORRRR', error)
    return (
      <div className="joinOuterContainer">
        <div className="form">
          <div>
            <div>
              <h1 className="heading">Join a Party</h1>
              <label htmlFor="email">
                <medium>Name</medium>
              </label>
              <input
                // placeholder="Name"
                // className="joinInput"
                type="text"
                name="name"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">
                <medium>Access Code</medium>
              </label>
              <input
                name="accessCode"
                // placeholder="Access Code"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button type="submit" onClick={this.handleSubmit}>
                Let's Vibe
              </button>
            </div>
            {error &&
              error.response && (
                <div id="errorMessage"> {error.response.data} </div>
              )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    error: state.party.error
  }
}

const mapDispatch = dispatch => {
  return {
    fetchParty: accessCode => dispatch(fetchParty(accessCode))
  }
}

export default connect(mapState, mapDispatch)(GuestLogin)

// Prop Types
GuestLogin.propTypes = {
  error: PropTypes.object
}
