import React from 'react'
import Dashboard from './Dashboard'

class HostDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  render() {
    //check for user authenticatioin and redirect here
    return <Dashboard />
  }
}

export default HostDashboard
