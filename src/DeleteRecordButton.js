import React from 'react';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

/**
 * A button which allows the user to delete an individual record.
 */
class DeleteRecordButton extends React.Component {
	/**
	 * Wrapper for handling deletion of the selected record
	 * @param {Event} e is unused
	 */
	handleClick(e) {
		console.log(`Record id is: ${this.props.recordid}`);
		this.props.onClick(this.props.recordid);
	}

	render() {
		return (
			<Button onClick={this.handleClick.bind(this)} variant="contained" color="secondary">
				Delete
				<DeleteIcon style={{fontSize: "1.5em"}}/>
			</Button>
		);
	}
}

export default DeleteRecordButton;
