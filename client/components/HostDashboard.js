import React from 'react'

class HostDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  render() {
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

export default HostDashboard
