import React from 'react';
import './Box.css';
import ZIndex from './ZIndex.js';

export default class Box extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mouseDragging: false,
			boxStyle: props.initialBoxStyle,
			boxNumber: props.boxNumber
		}

		this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if(!prevState.mouseDragging && this.state.mouseDragging) {
			let newBoxStyle = Object.assign({}, this.state.boxStyle);
			ZIndex.value += 1
			newBoxStyle.zIndex = ZIndex.value;

			this.setState({
				boxStyle: newBoxStyle
			});
		}
	}

	handleMouseDown(event) {
		event.persist();

		this.setState({
			mouseDragging: true,
			mouseX: event.clientX,
			mouseY: event.clientY
		});

		event.stopPropagation();
	}

	handleMouseMove(event) {
		if (!this.state.mouseDragging) {
			return;
		}

		event.persist();

		let newBoxStyle = Object.assign({}, this.state.boxStyle);
		newBoxStyle.left += event.clientX - this.state.mouseX;
		newBoxStyle.top += event.clientY - this.state.mouseY;

		this.setState({
			mouseX: event.clientX,
			mouseY: event.clientY,
			boxStyle: newBoxStyle
		});

		event.stopPropagation();
	}

	handleMouseUp(event) {
		this.setState({
			mouseDragging: false
		});

		event.stopPropagation();
	}

	render() {
		return (
			<div className='box' style={this.state.boxStyle} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>
			</div>
		);
	}
}