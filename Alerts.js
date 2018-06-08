import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import alertify from 'alertify.js';

/*
	state.Feedback -> [
		{
		  message: String,
			error: Boolean,
			timestamp: Date
		}
		...
	]
*/
const mapStateToProps = (state) => ({
	messages: state.Feedback
})

const mapDispatchToProps = (dispatch) => ({})

class Feedback extends React.Component {
	static propTypes = {
		messages: PropTypes.arrayOf(PropType.shape({
			timestamp: PropTypes.instanceOf(Date),
			message: PropTypes.string,
			error: PropTypes.bool
		})).isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			lastMessage: 0
		}
	}
	static getDerivedStateFromProps(props, state) {
		props.messages
			.filter(message => message.timestamp > state.lastMessage)
			.forEach((message) => {
				message.error ?
					alertify.closeLogOnClick(true).error(message.message) :
					alertify.closeLogOnClick(true).log(message.message);
			});
		return {
			lastMessage: Date.now()
		}
	}
	componentWillMount() {
		alertify.logPosition("bottom right");
	}
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (<div/>);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Feedback);
