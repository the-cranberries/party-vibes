import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchParty} from '../store/party'

const initialState = {
  name: '',
  accessCode: ''
}

export default class GuestLogin extends React.Component {
  constructor() {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
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
          {/* <div>
            <select
              placeholder="Profile Picture"
              type="image"
              onChange={event => setPicture(event.target.value)}
            />
          </div> */}
          {/* <Link
            onClick={e => (!name || !picture ? e.preventDefault() : null)}
            to={`/chat?name=${name}&picture=${picture}`}
          > */}
          <button type="submit">Let's vibe</button>
          {/* </Link> */}
        </div>
      </div>
    )
  }
}
