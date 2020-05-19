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
  accessCode: '',
  guestPicture: ''
  // error: ''
}

export class GuestLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleReturnParty = this.handleReturnParty.bind(this)
  }
  // componentDidMount() {
  //   this.props.fetchParty()
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSelect(event) {
    this.setState({
      guestPicture: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.fetchParty({
      accessCode: this.state.accessCode,
      name: this.state.name
    })
    sessionStorage.setItem('name', this.state.name)
    sessionStorage.setItem('isGuestLoggedIn', true)
    sessionStorage.setItem('picture', this.state.guestPicture)
  }

  handleReturnParty() {
    let party = this.props.fetchParty({
      accessCode: sessionStorage.getItem('party'),
      name: sessionStorage.getItem('name')
    })

    window.location.reload()
    // console.log('PARTY', party)
    // history.push(`/parties/${accessCode}`)
  }

  render() {
    console.log('STATE', this.state)
    console.log('PROPS', this.props)
    const {error} = this.props
    const isGuestLoggedIn = JSON.parse(
      sessionStorage.getItem('isGuestLoggedIn')
    )
    const currentParty = sessionStorage.getItem('party')
    let guestLogin

    if (isGuestLoggedIn && currentParty) {
      guestLogin = (
        <div className="joinOuterContainer">
          <h1 className="heading">You are currently logged in a party</h1>
          <Link to={`/parties/${currentParty}`}>
            <button type="button"> Return To Party </button>
          </Link>
        </div>
      )
    } else {
      guestLogin = (
        <div className="joinOuterContainer">
          <div className="form">
            <div>
              <div>
                <h1 className="heading">Join a Party</h1>
                <label htmlFor="name">
                  <h4>Name</h4>
                </label>
                <input
                  // placeholder="Name"
                  // className="joinInput"
                  type="text"
                  name="name"
                  required={true}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor="access code">
                  <h4>Access Code</h4>
                </label>
                <input
                  name="accessCode"
                  // placeholder="Access Code"
                  type="text"
                  onChange={this.handleChange}
                />
              </div>
              <select
                name="guestPicture"
                id="guestPicture"
                value={this.state.guestPicture}
                onChange={this.handleSelect}
              >
                <option value="">--Please choose an option--</option>
                <option value="bear">Bear</option>
                <option value="beaver">Beaver</option>
                <option value="fox">Fox</option>
                <option value="pig">Pig</option>
                <option value="whale">Whale</option>
              </select>
              <div>
                <button
                  type="submit"
                  disabled={!this.state.name || !this.state.accessCode}
                  onClick={this.handleSubmit}
                >
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
    return guestLogin
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
