import React from 'react'
import {connect} from 'react-redux'
import {
  putUser,
  fetchUserParty,
  postUserParty,
  endUserParty
} from '../store/user'
import {fetchParty} from '../store/party'
import {logout} from '../store'
import PropTypes from 'prop-types'

class HostDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPicture: '',
      showAccess: false
    }
  }

  componentDidMount() {
    this.props.getUserPartyFromStore(this.props.user.id)
  }

  createParty = () => {
    this.props.createNewParty(this.props.user.id)
  }

  handleSelect = event => {
    this.setState({selectedPicture: event.target.value})
  }

  joinParty() {
    const {user} = this.props
    const party = user.userParty

    //store user name, img, and accessCode into session storage
    sessionStorage.setItem('name', user.name)
    sessionStorage.setItem('picture', user.profilePicture)
    sessionStorage.setItem('accessCode', party.accessCode)

    //go to party room
    this.props.history.push(`/parties/${party.accessCode}`)
  }

  endParty(userId) {
    this.props.clearPartyFromStore(userId)
  }

  render() {
    const {user, handleClick} = this.props

    if (!user.userParty) {
      return (
        <div className="host_dashboard">
          <div>
            <h1>Welcome {user.name}</h1>
          </div>
          <div>
            <button type="button" onClick={() => this.createParty()}>
              New Party
            </button>
          </div>
          <div>
            <button type="button" onClick={handleClick}>
              Log Out
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="host_dashboard">
          <h1>Welcome {user.name}</h1>
          <img src={user.profilePicture} width="100" height="100" />
          <p>
            <select
              name="hostPicture"
              id="hostPicture"
              onChange={this.handleSelect}
            >
              <option value={user.profilePicture}>
                --Change Profile Icon--
              </option>
              <option value="/images/pug.png">Pug</option>
              <option value="/images/bear.png">Bear</option>
              <option value="/images/beaver.png">Beaver</option>
              <option value="/images/fox.png">Fox</option>
              <option value="/images/pig.png">Pig</option>
              <option value="/images/whale.png">Whale</option>
            </select>
            <button
              type="button"
              onClick={() => {
                this.props.updateUserPic(user.id, {
                  profilePicture: this.state.selectedPicture
                })
              }}
            >
              save changes
            </button>
          </p>
          {this.state.showAccess ? (
            <div>
              <p>
                {user.userParty.accessCode}
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
            <p>
              <button
                type="button"
                onClick={() => {
                  this.setState({showAccess: true})
                }}
              >
                Show Access Code
              </button>
            </p>
          )}
          <p>
            <button type="button" onClick={() => this.joinParty()}>
              Join Party
            </button>
            <button type="button" onClick={() => this.endParty(user.id)}>
              End Party
            </button>
          </p>
          <div>
            <button type="button" onClick={handleClick}>
              Log Out
            </button>
          </div>
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
  updateUserPic: (userId, updates) => {
    dispatch(putUser(userId, updates))
  },
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
  },
  handleClick() {
    dispatch(logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HostDashboard)

HostDashboard.propTypes = {
  handleClick: PropTypes.func.isRequired
}
