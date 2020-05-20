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
    const {party, user, handleClick} = this.props

    console.log('party: ', party)
    console.log('user', user)

    if (!user.userParty) {
      return (
        <div className="host_dashboard joinOuterContainer">
          <div className="">
            <h1 className="text-center">Welcome {user.name}</h1>
          </div>
          <div className="row text-center margin-space">
            <div className="col">
              <button
                className="btn aqua-btn"
                type="button"
                onClick={() => this.createParty()}
              >
                New Party
              </button>
            </div>
            <div className="col">
              <button
                className="btn aqua-btn"
                type="button"
                onClick={handleClick}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="host_dashboard joinOuterContainer">
          <h1 className="text-center">Welcome {user.name}</h1>
          <div className="row margintop">
            <div className="col-sm-5 text-center">
              <img src={user.profilePicture} width="100" height="100" />
            </div>
            <div className="col-sm-7">
              <div>
                <select
                  className="form-control"
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
              </div>
              <div>
                <button
                  className="btn aqua-btn margintop"
                  type="button"
                  onClick={() => {
                    this.props.updateUserPic(user.id, {
                      profilePicture: this.state.selectedPicture
                    })
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          {/* <br/> */}
          <div className="">
            {this.state.showAccess ? (
              <div>
                <div className="text-center margin-space">
                  <span className="code-box">{user.userParty.accessCode}</span>
                  <button
                    className="btn aqua-btn"
                    type="button"
                    onClick={() => {
                      this.setState({showAccess: false})
                    }}
                  >
                    Hide
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center margin-space">
                <button
                  className="btn aqua-btn"
                  type="button"
                  onClick={() => {
                    this.setState({showAccess: true})
                  }}
                >
                  Show Access Code
                </button>
              </div>
            )}
          </div>
          {/* <br/> */}
          <div className="row text-center margin-space2">
            <div className="col">
              <button
                className="btn aqua-btn"
                type="button"
                onClick={() => this.joinParty()}
              >
                Join Party
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => this.endParty(user.id)}
              >
                End Party
              </button>
            </div>
          </div>
          {/* <br/> */}
          <div className="row text-center">
            <div className="col">
              <button
                className="btn aqua-btn"
                type="button"
                onClick={handleClick}
              >
                Log Out
              </button>
            </div>
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
