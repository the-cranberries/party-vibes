import React from 'react'

class MainRoom extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="canvasDiv">
        <canvas id="main_canvas" width="1000" height="800" />
      </div>
    )
  }
}

export default MainRoom
