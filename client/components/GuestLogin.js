import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchParty} from '../store/party'

const initialState = {
  name: '',
  accessCode: ''
}

export class GuestLogin extends React.Component {
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

  handleSubmit(event) {
    event.preventDefault()
    if (this.props.fetchParty(this.state.accessCode)) {
      return <h1>Party with this accessCode does not exist</h1>
    }
  }

  render() {
    console.log('PROPS', this.props)
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
          {/* <Link
            onClick={e => (!name || !picture ? e.preventDefault() : null)}
            to={`/chat?name=${name}&picture=${picture}`}
          > */}

          <button type="submit" onSubmit={this.handleSubmit}>
            Let's vibe
          </button>
          {/* </Link> */}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    partyCode: state
  }
}

const mapDispatch = dispatch => {
  return {
    fetchParty: accessCode => dispatch(fetchParty(accessCode))
  }
}

export default connect(mapState, mapDispatch)(GuestLogin)
