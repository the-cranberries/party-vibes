import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchParty} from '../store/party'
import PropTypes from 'prop-types'

//when I enters the room, socket sends a message to the server to get the guests already in here
//and also create myself

//OR we have store guests and me in Redux

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
    sessionStorage.setItem('name', this.state.name)
  }

  render() {
    const {error} = this.props
    return (
      <div className="joinOuterContainer ">
        <div className="text-center">
          <form>
            <h1 className="heading">Join a Party</h1>
            <div className="row form-width mx-auto">
              <label className="col-sm-4" htmlFor="name">
                <medium>Name</medium>
              </label>
              <input
                // placeholder="Name"
                // className="joinInput"
                className="form-control col-sm-8"
                type="text"
                name="name"
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div className="row form-width mx-auto">
              <label className="col-sm-4" htmlFor="access code">
                <medium>Access Code</medium>
              </label>
              <input
                className="form-control col-sm-8"
                name="accessCode"
                // placeholder="Access Code"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div className="guestVibe">
              <button
                className="btn aqua-btn"
                type="submit"
                onClick={this.handleSubmit}
              >
                Let's Vibe
              </button>
            </div>
            {error &&
              error.response && (
                <div id="errorMessage">
                  <br /> {error.response.data}{' '}
                </div>
              )}
          </form>
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
