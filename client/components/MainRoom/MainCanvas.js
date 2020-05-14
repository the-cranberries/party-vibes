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

      // console.log(backgroundMap)

      backgroundMap.scaleX = 1.25
      backgroundMap.scaleY = 1.25

      this.stage.addChild(backgroundMap)
      this.stage.update()
      // console.log(this.stage)
    }
  }

  render() {
    return <canvas ref={this.canvasRef} width="1400" height="1200" />
  }
}

export default MainCanvas
