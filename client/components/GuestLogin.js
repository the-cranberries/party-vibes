import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchParty} from '../store/party'

const initialState = {
  name: '',
  accessCode: '',
  error: ''
}

export class GuestLogin extends React.Component {
  constructor() {
    super()
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
    this.props.fetchParty(this.state.accessCode)
  }

  render() {
    console.log('props', this.props)
    return (
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Join a Party</h1>
          <div>
            <input
              placeholder="Name"
              className="joinInput"
              type="text"
              name="Name"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              name="accessCode"
              placeholder="Access Code"
              type="text"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" onClick={this.handleSubmit}>
            Let's Vibe
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    error: state.party
  }
}

const mapDispatch = dispatch => {
  return {
    fetchParty: accessCode => dispatch(fetchParty(accessCode))
  }
}

export default connect(mapState, mapDispatch)(GuestLogin)
