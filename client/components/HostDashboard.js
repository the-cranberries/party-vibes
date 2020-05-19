import React from 'react'
import {connect} from 'react-redux'
import {fetchUserParty, postUserParty, endUserParty} from '../store/user'
import {fetchParty} from '../store/party'

class HostDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAccess: false
    }
  }

  componentDidMount() {
    this.props.getUserPartyFromStore(this.props.user.id)
  }

  handleClick = () => {
    this.props.createNewParty(this.props.user.id)
  }

  joinParty(accessCode, name) {
    this.props.fetchParty({accessCode, name})
    sessionStorage.setItem('name', name) // temp for now
  }

  endParty(userId) {
    this.props.clearPartyFromStore(userId)
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
            <button type="button" onClick={() => this.handleClick()}>
              New Party
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="host_dashboard">
          <h1>Welcome {user.name}</h1>
          {/* <p>Access Code: {user.userParty.accessCode}</p> */}
          {this.state.showAccess ? (
            <div>
              <p>
                {user.userParty[0].accessCode}
                <button
                  type="button"
                  onClick={() => {
                    this.setState({showAccess: false})
                  }}
                >
                  hide
                </button>
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                this.setState({showAccess: true})
              }}
            >
              Show Access Code
            </button>
          )}
          <button
            type="button"
            //fix merging with chat branch
            // onClick={() => this.joinParty(user.userParty.accessCode, user.name)}
          >
            Join Party
          </button>
          <button type="button" onClick={() => this.endParty(user.id)}>
            End Party
          </button>
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
  },
  createNewParty: userId => {
    dispatch(postUserParty(userId))
  },
  clearPartyFromStore: userId => {
    dispatch(endUserParty(userId))
  },
  fetchParty: accessCode => {
    dispatch(fetchParty(accessCode))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HostDashboard)
