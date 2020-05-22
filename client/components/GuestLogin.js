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
  guestPicture: '/images/person1.png'
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
    console.log(this.props)

    const accessCode = sessionStorage.getItem('party')
    const name = sessionStorage.getItem('name')

    this.props.fetchParty({
      accessCode,
      name
    })

    this.props.history.push(`/parties/${accessCode}`)

    // window.location.reload()
    // console.log('PARTY', party)
  }

  render() {
    // console.log('STATE', this.state)
    // console.log('PROPS', this.props)
    const {error} = this.props
    const isGuestLoggedIn = JSON.parse(
      sessionStorage.getItem('isGuestLoggedIn')
    )
    const currentParty = sessionStorage.getItem('party')
    let guestLogin

    if (isGuestLoggedIn && currentParty) {
      guestLogin = (
        <div className="vertical-center justify-content-center">
          <div className="joinOuterContainer">
            <h1 className="heading text-center">
              You are currently logged in a party
            </h1>
            <div className="text-center">
              <button
                className="btn yellow-orange-btn"
                type="button"
                onClick={this.handleReturnParty}
              >
                {' '}
                Return To Party{' '}
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      guestLogin = (
        <div className="vertical-center justify-content-center">
          <div className="joinOuterContainer">
            <div className="text-center">
              <form>
                <h1 className="heading">Join a Party</h1>
                <div className="row form-width mx-auto">
                  <label className="col-sm-4" htmlFor="name">
                    <span>Name</span>
                  </label>
                  <input
                    // placeholder="Name"
                    // className="joinInput"
                    className="form-control col-sm-8"
                    type="text"
                    name="name"
                    required={true}
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="row form-width mx-auto">
                  <label className="col-sm-4" htmlFor="access code">
                    <span>Access Code</span>
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
                <div>
                  <img
                    className="icon"
                    src={this.state.guestPicture}
                    width="100"
                    height="100"
                  />
                  <select
                    className="form-control select-width"
                    name="guestPicture"
                    id="guestPicture"
                    value={this.state.guestPicture}
                    onChange={this.handleSelect}
                  >
                    <option value="/images/person1.png">Person 1</option>
                    <option value="/images/person2.png">Person 2</option>
                    <option value="/images/person3.png">Person 3</option>

                    <option value="/images/girl1.png">Girl 1</option>
                    <option value="/images/girl2.png">Girl 2</option>

                    <option value="/images/boy1.png">Boy 1</option>
                    <option value="/images/boy2.png">Boy 2</option>

                    <option value="/images/woman1.png">Woman 1</option>
                    <option value="/images/woman2.png">Woman 2</option>
                    <option value="/images/woman3.png">Woman 3</option>

                    <option value="/images/man1.png">Man 1</option>
                    <option value="/images/man2.png">Man 2</option>
                    <option value="/images/man3.png">Man 3</option>
                  </select>
                  <br />
                  <div className="vibe">
                    <button
                      className="btn yellow-orange-btn"
                      type="submit"
                      disabled={!this.state.name || !this.state.accessCode}
                      onClick={this.handleSubmit}
                    >
                      Let's Vibe
                    </button>
                  </div>
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
