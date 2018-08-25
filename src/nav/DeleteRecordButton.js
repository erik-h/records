import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import NavButton from './NavButton';

/**
 * A button which allows the user to search for and delete an existing record.
 */
class DeleteRecordButton extends React.Component {
	static propTypes = {
		updateAppState: PropTypes.func.isRequired,
	}

	/**
	 * Wrapper for updating the core App state when this button is pressed
	 */
	handleClick() {
		this.props.updateAppState({
			showDelete: true,
		});
	}

	render() {
		return (
			<NavButton onClick={this.handleClick.bind(this)}>
				<DeleteIcon />
			</NavButton>
		);
	}
}

export default DeleteRecordButton;
