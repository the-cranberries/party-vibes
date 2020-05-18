import React from 'react'
import {connect} from 'react-redux'

class HostDashboard extends React.Component {
  render() {
    const {party, user} = this.props

    console.log('party: ', party)
    console.log('user', user)

    return (
      <div>
        <div>
          <h1>Welcome (host name)</h1>
        </div>
        <div>
          <button type="button">New Party</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  party: state.party,
  user: state.user
})

export default connect(mapStateToProps)(HostDashboard)
