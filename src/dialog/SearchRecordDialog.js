import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import RecordsTable from './RecordsTable';

/**
 * A Dialog for prompting the user for data to search for and display matching
 * records from the back end
 */
class SearchRecordDialog extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		open: PropTypes.bool.isRequired,
		onChange: PropTypes.func.isRequired,
		records: PropTypes.array.isRequired,
		recordModifier: PropTypes.element,
		foundRecords: PropTypes.bool.isRequired,
		handleSearch: PropTypes.func.isRequired,
		handleClose: PropTypes.func.isRequired,
	};

	render() {
		return (
				<Dialog
					scroll="body"
					open={this.props.open}
					onClose={this.props.handleClose}
				>
					<DialogTitle>{this.props.title ? this.props.title : "Search for records"}</DialogTitle>
					<form onSubmit={(e) => e.preventDefault()}>
						<DialogContent>
							<DialogContentText>
								Please fill out the necessary fields below.
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
								<Typography style={{paddingTop: "5%"}} variant="display1">No records found</Typography>
							}
						</DialogContent>
						<DialogActions>
							<Button type="submit" name="searchButton" onClick={this.props.handleSearch}>
								Search
							</Button>
							<Button type="button" name="closeButton" onClick={this.props.handleClose}>
								Close
							</Button>
						</DialogActions>
					</form>
				</Dialog>
		);
	}
}

export default SearchRecordDialog;
