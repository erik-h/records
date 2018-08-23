import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import RecordsTable from './RecordsTable';

class SearchRecordDialog extends React.Component {
	render() {
		return (
				<Dialog
					scroll="body"
					open={this.props.open}
					onClose={this.props.onClose}
				>
					<DialogTitle>Test Dialog</DialogTitle>
					<form onSubmit={(e) => e.preventDefault()}>
						<DialogContent>
							<DialogContentText>
								Search for a record!
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
							{
								this.props.records.length > 0 &&
								<RecordsTable
								recordModifier={this.props.recordModifier}
								records={this.props.records}
								/>
							}
							{
								!this.props.foundRecords &&
								<h2>No records found</h2>
							}
						</DialogContent>
						<DialogActions>
							<Button type="submit" onClick={this.props.handleSearch}>
								Search
							</Button>
							<Button type="button" onClick={this.props.handleClose}>
								Close
							</Button>
						</DialogActions>
					</form>
				</Dialog>
		);
	}
}

export default SearchRecordDialog;
