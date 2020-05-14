import React from 'react'
import {Stage, Bitmap} from '@createjs/easeljs'

class MainCanvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.stage = {}
  }

  componentDidMount() {
    const canvas = this.canvasRef.current

    console.log('canvas: ', canvas)
    this.stage = new Stage(canvas)

    this.stage.tickOnUpdate = false

    const background = new Image()
    background.src = 'background.png'

    let backgroundMap

    background.onload = () => {
      backgroundMap = new Bitmap(background)

      console.log(backgroundMap)
      this.stage.addChild(backgroundMap)
      this.stage.update()
      console.log(this.stage)
    }
  }

  render() {
    return <canvas ref={this.canvasRef} width="1000" height="800" />
  }
}

export default MainCanvas
