import React from 'react';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteRecordButton extends React.Component {
	handleClick(e) {
		console.log(`Record id is: ${this.props.recordid}`);
		this.props.onClick(this.props.recordid);
	}
	render() {
		return (
			<Button onClick={this.handleClick.bind(this)} style={{fontSize: "1em"}} variant="contained" color="secondary">
				Delete
				<DeleteIcon style={{fontSize: "1.5em"}}/>
			</Button>
		);
	}
}

export default DeleteRecordButton;
