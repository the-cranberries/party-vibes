import React from 'react'
import {Stage, Shape, Bitmap} from '@createjs/easeljs'
import Canvas from './Canvas'

class MainRoom extends React.Component {
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

    const shape = new Shape()

    shape.graphics.beginFill('red').drawRect(0, 0, 120, 120)

    this.stage.addChild(shape)
    this.stage.update()

    console.log(this.stage)

    // const background = new Image('./images/background.png')

    // let backgroundMap

    // background.onload = () => {
    //   backgroundMap = new Bitmap(background)
    //   this.stage.addChild(backgroundMap)
    //     this.stage.update()
    //     this.canvasRef = React.createRef();
    // }
  }

  render() {
    return <canvas ref={this.canvasRef} width="1000" height="800" />
  }
}

export default MainRoom
