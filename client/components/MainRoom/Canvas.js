import React from 'react'

class Canvas extends React.Component {
  render() {
    return (
      <div className="canvasDiv">
        <canvas ref={this.props.canvasRef} width="1000" height="800" />
      </div>
    )
  }
}

export default Canvas
