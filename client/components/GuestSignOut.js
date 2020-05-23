import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchParty} from '../store/party'
import PropTypes from 'prop-types'

//when I enters the room, socket sends a message to the server to get the guests already in here
//and also create myself

//OR we have store guests and me in Redux

export default class GuestSignOut extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    sessionStorage.clear()
  }

  render() {
    return (
      <div className="vertical-center justify-content-center">
        <div className="host_dashboard joinOuterContainer">
          <h1 className="text-center heading">Host has ended party</h1>
          <div className="row text-center margin-space">
            <div className="col">
              <Link to="/">
                <button
                  className="btn yellow-orange-btn"
                  type="button"
                  onSubmit={this.handleSubmit}
                >
                  Sign Out
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
