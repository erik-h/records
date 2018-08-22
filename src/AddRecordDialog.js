import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class AddRecordDialog extends React.Component {
	render() {
		return (
				<Dialog
					open={this.props.open}
					onClose={this.props.onClose}
				>
					<DialogTitle>Test Dialog</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Test dialog content is right here!
						</DialogContentText>
						<TextField
							onChange={this.props.onChange}
							autoFocus
							name="name"
							label="Name"
							fullWidth
						/>
						<TextField
							onChange={this.props.onChange}
							name="phoneNumber"
							label="Phone Number"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.props.handleCancel}>
							Cancel
						</Button>
						<Button onClick={this.props.handleAdd}>
							Add
						</Button>
					</DialogActions>
				</Dialog>
		);
	}
}

export default AddRecordDialog;
