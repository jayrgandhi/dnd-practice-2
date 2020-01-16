import React from 'react';
import './App.css';
import Canvas from './Canvas.js';
import Box from './Box.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.colorList = ['blue', 'red', 'green', 'yellow', 'orange', 'purple'];

    this.state = {
      boxList: [],
      boxCounter: 0
    }

    this.handleNewBox = this.handleNewBox.bind(this);
  }

  handleNewBox(boxStyle) {
    let newBoxStyle = Object.assign({}, boxStyle);
    newBoxStyle.zIndex = 0;

    this.setState(prevState => ({
      boxList: [...prevState.boxList, <Box initialBoxStyle={boxStyle} key={JSON.stringify(boxStyle)}/>]
    }));
  }

  render() {
    return (
      <div>
        <Canvas boxColor={this.colorList[this.state.boxList.length % this.colorList.length]} finishNewBox={this.handleNewBox}/>
        {this.state.boxList}
      </div>
    );
  }
}
