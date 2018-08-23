import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import NavButton from './NavButton';

class DeleteRecordsButton extends React.Component {
	handleClick() {
		// alert('Deleting!');
		this.props.handler({
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

export default DeleteRecordsButton;
