import React from 'react'
import {connect} from 'react-redux'
import {fetchUserParty} from '../store/user'

class HostDashboard extends React.Component {
  componentDidMount() {
    //fetch party from DB via a redux thunk
    this.props.dispatchFetchUserParty()
  }

  render() {
    const {party, user} = this.props

    console.log('party: ', party)
    console.log('user', user)

    if (!party) {
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
    } else {
      return (
        <div>
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
  dispatchFetchUserParty: userId => dispatch(fetchUserParty(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(HostDashboard)
