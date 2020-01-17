import React from 'react';
import './Canvas.css';
import { ShapeContext } from './ShapeContext.js';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      mouseDragging: false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.mouseDragging && prevState.mouseDragging) {
      let canvasStyle = this.state.boxStyle;

      this.setState({
        boxStyle: null
      })

      this.props.finishNewBox(canvasStyle);
    }
  }

  handleMouseDown(event) {
    this.setState({
      mouseDragging: true,
      originX: event.clientX,
      originY: event.clientY
    });
  }

  handleMouseMove(event) {
    if (!this.state.mouseDragging) {
      return;
    }

    let left;
    let top;
    let height;
    let width;

    if (event.clientX > this.state.originX && event.clientY > this.state.originY) {
      left = this.state.originX;
      top = this.state.originY;
      height = event.clientY - this.state.originY;
      width = event.clientX - this.state.originX;

    } else if (event.clientX > this.state.originX && event.clientY < this.state.originY) {
      left = this.state.originX;
      top = event.clientY;
      height = this.state.originY - event.clientY;
      width = event.clientX - this.state.originX;

    } else if (event.clientX < this.state.originX && event.clientY < this.state.originY) {
      left = event.clientX;
      top = event.clientY;
      height = this.state.originY - event.clientY;
      width = this.state.originX - event.clientX;

    } else {
      left = event.clientX;
      top = this.state.originY;
      height = event.clientY - this.state.originY;
      width = this.state.originX - event.clientX;
    }

    if (this.context.shape === 'solid') {
      this.setState({
        boxStyle: {
          left: left,
          top: top,
          height: height,
          width: width,
          backgroundColor: this.props.boxColor
        }
      });
    } else {
      this.setState({
        boxStyle: {
          left: left,
          top: top,
          height: height,
          width: width,
          border: `1px solid ${this.props.boxColor}`
        }
      });
    }
  }

  handleMouseUp(event) {
    this.setState({
      mouseDragging: false
    });
  }

  render() {
    return (
      <div className='canvas' style={this.state.boxStyle}>
      </div>
    );
  }
}

Canvas.contextType = ShapeContext;
