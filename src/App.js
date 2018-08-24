import React from 'react';

import BookIcon from '@material-ui/icons/Book';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import API from './API';
import AddRecordDialog from './AddRecordDialog';
import DeleteRecordDialog from './DeleteRecordDialog';
import ErrorSnackbar from './ErrorSnackbar';
import SearchRecordDialog from './SearchRecordDialog';
import NavBar from './NavBar';
import RecordStats from './RecordStats';

/**
 * A record keeping application; users can add, delete, and search for records.
 */
class App extends React.Component {
	constructor(props) {
		super(props);

		this.API = new API();

		this.state = {
			// Whether to show the add record dialog
			showAdd: false,
			// Whether to show the delete record dialog
			showDelete: false,
			// Whether to show the search record dialog
			showSearch: false,

			// Whether to show the error Snackbar
			showErrorSnackbar: false,

			// The user's currently provided name and phone number; this is used
			// for adding, deleting, and searching.
			name: "",
			phoneNumber: "",

			// Whether our search results have found records. This defaults to true
			// so that our search Dialog does not initialize in the "No records
			// found" state upon being opened.
			foundRecords: true,
			// The records we're currently displaying to the user. This is used for
			// both deletion and searching.
			displayedRecords: [],

			// Internally kept state of the average records added and deleted. These
			// are queried from the back end.
			averageRecordsAdded: 0,
			averageRecordsDeleted: 0,
		};
	}

	/**
	 * A wrapper for updating the applications state
	 * @param {Object} newState
	 */
	updateAppState(newState) {
		this.setState(newState);
	}

	/**
	 * Determine if the given name is valid
	 * @param {string} name
	 * @return {boolean} true if the given name is valid
	 */
	validName(name) {
		// We'll say a name is valid as long as it isn't empty
		return name;
	}

	/**
	 * Determine if the given phone number is valid
	 * @param {string} phone number
	 * @return {boolean} true if the given phone number is valid
	 */
	validPhoneNumber(phoneNumber) {
		// TODO: maybe apply more checks? Right now we only allow
		// digits; we should probably also allow dashes, and then just
		// remove them on the backend.
		return phoneNumber && /^\d+$/.test(phoneNumber);
	}

	/**
	 * Handle changes to the app state by onChange events
	 * @param {Event} e the event, triggered by a user input field with a target and name
	 */
	handleChange(e) {
		const key = e.target.name;
		const value = e.target.value;
		this.setState({
			[key]: value
		});
	}

	/**
	 * Handler for closing the error Snackbar
	 * @param {Event} event
	 * @param {string} reason the reason for closing the Snackbar
	 */
	onCloseErrorSnackbar(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({
			showErrorSnackbar: false,
		});
	}

	/**
	 * Call the back end API for adding a new record
	 * @param {Object} newRecord
	 */
	addRecord(newRecord) {
		let addedRecord = this.API.addRecord(newRecord);

		// console.log(`Added a record: ${JSON.stringify(addedRecord)}`);
	}

	/**
	 * Call the back end API for deleting a record
	 * @param {Object} record
	 */
	deleteRecord(record) {
		let deletedRecord = this.API.deleteRecord(record);

		// console.log(`Deleted a record: ${JSON.stringify(deletedRecord)}`);
	}

	/**
	 * Call the back end API for determining the average records added per hour,
	 * updating our App state with that value
	 */
	calculateAverageAdded() {
		this.setState({
			averageRecordsAdded: this.API.calculateAverageAdded(),
		});
	}

	/**
	 * Call the back end API for determining the average records deleted per
	 * hour, updating our App state with that value
	 */
	calculateAverageDeleted() {
		this.setState({
			averageRecordsDeleted: this.API.calculateAverageDeleted(),
		});
	}

	/**
	 * Call the back end API for finding records that exactly match the given
	 * search properties
	 * @param {Object} searchProps
	 * @return {(Object|Array)} a list of records that match the given search props
	 */
	findExactRecords(searchProps) {
		return this.API.findExactRecords(searchProps);
	}

	/**
	 * Call the back end API for finding records that fuzzy match the given
	 * search properties
	 * @param {Object} searchProps
	 * @return {(Object|Array)} a list of records that match the given search props
	 */
	findFuzzyRecords(searchProps) {
		return this.API.findFuzzyRecords(searchProps);
	}

	/**
	 * Handler for closing the add record Dialog
	 * @param {boolean} shouldAdd true if the "Add" button was pressed, false if "Cancel"
	 */
	handleCloseAddDialog(shouldAdd) {
		const newName = this.state.name;
		const newPhoneNumber = this.state.phoneNumber;

		if (shouldAdd && this.validName(newName) && this.validPhoneNumber(newPhoneNumber)) {
			this.addRecord({
				name: newName,
				phoneNumber: newPhoneNumber,
			});
			// console.log(`newRecord name is: ${JSON.stringify(this.state.name)}`);
			// console.log(`newRecord phone number is: ${JSON.stringify(this.state.phoneNumber)}`);
		}
		else if (shouldAdd) {
			// The user hit "Ok" or the return key so they _do_ want to add a record;
			// however, there input is invalid, so we'll display an error
			this.setState({
				showErrorSnackbar: true,
			});
			return;
		}

		// At this point we either successfully added a record, or the user hit
		// "Cancel", so we can close the add record Dialog
		this.setState({
			showAdd: false,
			name: "",
			phoneNumber: "",
			showErrorSnackbar: false,
		});
	}

	/**
	 * Handler for closing the search for records Dialog
	 */
	handleCloseSearchDialog() {
		this.setState({
			showSearch: false,
			name: "",
			phoneNumber: "",
			foundRecords: true,
			displayedRecords: [],
		});
	}

	/**
	 * Handler for closing the delete records Dialog
	 */
	handleCloseDeleteDialog() {
		this.setState({
			showDelete: false,
			name: "",
			phoneNumber: "",
			foundRecords: true,
			displayedRecords: [],
		});
	}

	/**
	 * Perform a search for the records desired by the user
	 */
	handleSearchRecords() {
		const { name, phoneNumber } = this.state;
		// console.log(`Going to search for: ${name} and ${phoneNumber}`);
		let foundRecords = this.findFuzzyRecords({
			name: name,
			phoneNumber: phoneNumber,
		});
		// console.log(`Here is what we found: ${JSON.stringify(foundRecords)}`);
		if (foundRecords.length === 0) {
			// console.log('Did not find any records!');
			this.setState({
				foundRecords: false,
				displayedRecords: [],
			});
		}
		else {
			this.setState({
				foundRecords: true,
				displayedRecords: foundRecords,
			});
		}
	}

	/**
	 * Delete the record with the given ID
	 */
	handleDelete(recordId) {
		// console.log(`Handling delete, recordId is: ${recordId}`);
		this.deleteRecord({
			id: recordId,
		});
		this.handleSearchRecords();
	}

	/**
	 * Wrapper for updating our state with the average added and deleted records
	 * per hour
	 */
	updateAverages() {
		this.calculateAverageAdded();
		this.calculateAverageDeleted();
	}

  render() {
    return (
			<React.Fragment>
				<CssBaseline />
				<div className="App">
					<NavBar updateAppState={this.updateAppState.bind(this)}>
					</NavBar>
					<RecordStats
						averageRecordsAdded={this.state.averageRecordsAdded}
						averageRecordsDeleted={this.state.averageRecordsDeleted}
						updateAverages={this.updateAverages.bind(this)}
					/>
					<div id="project-info">
						<BookIcon className="book-logo" color="primary" />
						<p><b>TODO</b>, this will contain some info about the project.</p>
					</div>
					<AddRecordDialog
						open={this.state.showAdd}
						onClose={this.handleCloseAddDialog.bind(this, false)}
						onChange={this.handleChange.bind(this)}
						handleCancel={this.handleCloseAddDialog.bind(this, false)}
						handleAdd={this.handleCloseAddDialog.bind(this, true)}
					/>
					<DeleteRecordDialog
						open={this.state.showDelete}
						onChange={this.handleChange.bind(this)}
						onDelete={this.handleDelete.bind(this)}
						handleClose={this.handleCloseDeleteDialog.bind(this)}
						handleSearch={this.handleSearchRecords.bind(this)}
						records={this.state.displayedRecords}
						foundRecords={this.state.foundRecords}
					/>
					<SearchRecordDialog
						open={this.state.showSearch}
						onChange={this.handleChange.bind(this)}
						handleClose={this.handleCloseSearchDialog.bind(this)}
						handleSearch={this.handleSearchRecords.bind(this)}
						records={this.state.displayedRecords}
						foundRecords={this.state.foundRecords}
					/>
					<ErrorSnackbar
						open={this.state.showErrorSnackbar}
						onClick={this.onCloseErrorSnackbar.bind(this)}
						onClose={this.onCloseErrorSnackbar.bind(this)}
						autoHideDuration={3000}
					>
						Invalid input provided!
					</ErrorSnackbar>
				</div>
			</React.Fragment>
    );
  }
}

export default App;
