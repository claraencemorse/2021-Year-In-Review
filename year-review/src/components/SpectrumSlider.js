import React, {Component} from 'react'
import styled from 'styled-components'
import { ReactComponent as ArrowR } from '../assets/right_arrow.svg';
import { ReactComponent as ArrowL } from '../assets/left_arrow.svg';

const n=4

const RightArrow = styled(ArrowR)`
	
	& path {
    stroke: ${props => props.theme.white};
  }
  &:hover path {
    stroke: ${props => props.theme.white};
	}
	position: absolute;
	top: 50vh;
	left: 90vw;
`;

const LeftArrow = styled(ArrowR)`
	transform: rotate(180deg);
	& path {
		stroke: ${props => props.theme.white};
	}
	&:hover path {
		stroke: ${props => props.theme.white};
	}
	position: absolute;
	top: 50vh;
	left: 5vw;
	z-index: 5;
`;

const ColumnWrapper = styled.div`
	display: flex;
	width: 100vw;
	overflow: hidden;
	position: relative;

`;

const Contain = styled.div`
	width: 100vw;
	display: flex;
	flex-direction: row;
	transform: translate(${({translateValue}) => translateValue}vw);
	transition: transform ease-out 0.45s;
`;

const Column = styled.a`
	display: flex;
	width: 25vw;
	height: 70vh;
	background-size: cover;
	background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),  url(${({img_src}) => img_src});
	text-align: center;
    background-position: center;
	text-decoration: none;
	color: black;
`;

const Title = styled.h4`
	margin-top: 3px;
	color: black;
	position: relative;
	width: 25vw;
	padding: 2vw;
	top: 20%;
	color: white;
`;

class SpectrumSlider extends Component{
	constructor(props) {
		super(props);
	
		this.state = {
			index: 0,
			leftDisabled: true,
			rightDisabled: false,
		}

		this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
		this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
	  }

	handleLeftArrowClick() {
		if (this.state.leftDisabled)
			return
		const cur = this.state.index-1
		if (cur === 0)
			this.setState({leftDisabled: true});
		if (cur === this.props.data.length-5)
			this.setState({ rightDisabled: false});
		this.setState({ index: this.state.index - 1});
	}

	handleRightArrowClick() {
		if (this.state.rightDisabled)
			return
		const cur = this.state.index+1
		if (cur === this.props.data.length-4) {
			this.setState({ rightDisabled: true});
		}
		if (cur === 1)
			this.setState({ leftDisabled: false});
		this.setState({ index: cur });
	}

	render(){
		const grid = this.props.data.map((data, i) => {
			return (
			<Column href={data.link} target="_blank"  img_src={data.img} key={i} index={i} 
				onClick = {() => console.log("hi")}>
					<Title>{data.title}</Title>
			</Column>
			)
		});

		const leftArrow = this.state.leftDisabled? null: <LeftArrow onClick={this.handleLeftArrowClick} />
		const rightArrow = this.state.rightDisabled? null: <RightArrow onClick={this.handleRightArrowClick} />

		return (
			<ColumnWrapper>
				<Contain translateValue={this.state.index*(-25)}> {grid}</Contain>
				{leftArrow}
				{rightArrow}
			</ColumnWrapper>		

		);
	} 
    
 
}
export default SpectrumSlider;

