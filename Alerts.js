import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import alertify from 'alertify.js';
//import {clearFeedback} from 'actions/feedbackActions';

const mapStateToProps = (state) => ({
	messages: state.Feedback
})

const mapDispatchToProps = (dispatch) => ({
	//clearFeedback: (message, timestamp) => { dispatch(clearFeedback(message, timestamp)) }
})

class Feedback extends React.Component {
	static propTypes = {
		messages: PropTypes.array.isRequired//,
		//clearFeedback: React.PropTypes.func.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			lastMessage: 0
		}
	}
	static getDerivedStateFromProps(props, state) {
		props.messages.filter((x) => x.timestamp > state.lastMessage).forEach((message) => {
			message.error ? 
				alertify.closeLogOnClick(true).error(message.message) :
				alertify.closeLogOnClick(true).log(message.message);
		})
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
		return (<div/>)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Feedback);