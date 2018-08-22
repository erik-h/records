import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import NavButton from './NavButton';

class DeleteRecordButton extends React.Component {
	handleClick() {
		alert('Deleting!');
	}

	render() {
		return (
			<NavButton onClick={this.handleClick}>
				<DeleteIcon />
			</NavButton>
		);
	}
}

export default DeleteRecordButton;
