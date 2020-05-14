import React from 'react'
import MainCanvas from './MainCanvas'

class MainRoom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      guests: [],
      me: {}
    }
  }

  render() {
    return <MainCanvas guests={this.state.guests} thisGuest={this.state.me} />
  }
}

export default MainRoom
