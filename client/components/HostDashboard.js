import React from 'react'
import {connect} from 'react-redux'
import {fetchUserParty} from '../store/user'

class HostDashboard extends React.Component {
  componentDidMount() {
    this.props.getUserPartyFromStore(this.props.user.id)
  }

  render() {
    const {party, user} = this.props

    console.log('party: ', party)
    console.log('user', user)

    if (!user.userParty || user.userParty.length === 0) {
      return (
        <div className="host_dashboard">
          <div>
            <h1>Welcome {user.name}</h1>
          </div>
          <div>
            <button type="button">New Party</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="host_dashboard">
          <h1>Welcome {user.name}</h1>
          <p>View Coming Soon!</p>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  party: state.party,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getUserPartyFromStore: userId => {
    dispatch(fetchUserParty(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HostDashboard)
