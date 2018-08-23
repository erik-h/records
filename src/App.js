import React from 'react';

import BookIcon from '@material-ui/icons/Book';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import AddRecordDialog from './AddRecordDialog';
import DeleteRecordDialog from './DeleteRecordDialog';
import ErrorSnackbar from './ErrorSnackbar';
import SearchRecordDialog from './SearchRecordDialog';
import NavBar from './NavBar';

let mockDB = window.mockDB = [
	{
		id: 1000000000,
		name: "John Doe",
		phoneNumber: "7805551234",
	}
];

class App extends React.Component {
	constructor(props) {
		super(props);

		this.handler = this.handler.bind(this);
		this.state = {
			showAdd: false,
			showDelete: false,
			showSearch: false,

			showErrorSnackbar: false,

			name: "",
			phoneNumber: "",

			foundRecords: true,
			displayedRecords: [],
		};
	}

	handler(newState) {
		this.setState(newState);
	}

	validName(name) {
		// We'll say a name is valid as long as it isn't empty
		return name;
	}

	validPhoneNumber(phoneNumber) {
		// TODO: maybe apply more checks?
		return phoneNumber && /^\d+$/.test(phoneNumber);
	}

	handleChange(e) {
		const key = e.target.name;
		const value = e.target.value;
		this.setState({
			[key]: value
		});
	}

	onCloseErrorSnackbar(event, reason) {
		if (reason === 'clickaway') {
			return;
		}
		console.log('Closing error message!');
		this.setState({
			showErrorSnackbar: false,
		});
	}

	findNextID() {
		return mockDB.reduce((previous, current) => {
			return previous === undefined || current.id > previous ? current.id : previous;
		}, 999999999) + 1;
	}

	addRecord(newRecord) {
		// TODO: do a POST request to the real API to add our new record
		mockDB.push({
			id: this.findNextID(),
			...newRecord
		});
		console.log(`mockDB is now: ${JSON.stringify(mockDB)}`);
	}

	deleteRecord(deleteRecord) {
		// Find the index in our mock DB that matches the given ID to delete
		let recordIndex = mockDB.findIndex((element) => {
			// return element.id === deleteId;
			// Search through each of the properties that must match
			return this.allPropsMatch(element, deleteRecord);
		});
		// TODO: deal with case where recordIndex is -1 because we don't find the record
		// Delete the record from the mock DB
		let deletedRecord = mockDB.splice(recordIndex, 1);
		console.log(`Deleted record: ${JSON.stringify(deletedRecord)}`);
	}

	allPropsMatch(testSubject, master) {
		for (let prop in master) {
				if (!testSubject.hasOwnProperty(prop) || testSubject[prop] !== master[prop]) {
					return false
				}
		}
		return true;
	}

	fuzzyPropsMatch(testSubject, master) {
		for (let prop in master) {
			if (!master[prop] || !testSubject.hasOwnProperty(prop)) {
				// Skip comparing against empty props, as they will always match with
				// any string; also skip props that our test subject does not have
				continue;
			}
			console.log(`Checking if ${testSubject[prop]} includes ${master[prop]}`)
			if (testSubject[prop].toLowerCase().includes(master[prop].toLowerCase())) {
				return true;
			}
		}
		return false;
	}

	findExactRecords(searchProps) {
		return mockDB.filter((element) => {
			return this.allPropsMatch(element, searchProps);
		});
	}

	findFuzzyRecords(searchProps) {
		return mockDB.filter((element) => {
			return this.fuzzyPropsMatch(element, searchProps);
		});
	}

	handleCloseAddDialog(shouldAdd) {
		console.log(`shouldAdd is: ${shouldAdd}`);
		const newName = this.state.name;
		const newPhoneNumber = this.state.phoneNumber;

		if (shouldAdd && this.validName(newName) && this.validPhoneNumber(newPhoneNumber)) {
			console.log('Doing all the important adding stuff...');
			this.addRecord({
				name: newName,
				phoneNumber: newPhoneNumber,
			});
			// DEBUG: testing finding a record we just added
			// let foundRecords = this.findFuzzyRecords({
			// let foundRecords = this.findExactRecords({
			// 	name: newName,
			// });
			// console.log(`Fuzzy found the record we just added!: ${JSON.stringify(foundRecords)}`);
			// DEBUG: testing deleting a record
			// this.deleteRecord({
			// 	id: 1000000000,
			// });
			console.log(`newRecord name is: ${JSON.stringify(this.state.name)}`);
			console.log(`newRecord phone number is: ${JSON.stringify(this.state.phoneNumber)}`);
		}
		else if (shouldAdd) {
			console.error('New record is invalid! It will not be added');
			this.setState({
				showErrorSnackbar: true,
			});
			return;
		}

		this.setState({
			showAdd: false,
			name: "",
			phoneNumber: "",
			showErrorSnackbar: false,
		});
	}

	handleCloseSearchDialog() {
		this.setState({
			showSearch: false,
			name: "",
			phoneNumber: "",
			foundRecords: true,
			displayedRecords: [],
		});
	}

	handleCloseDeleteDialog() {
		this.setState({
			showDelete: false,
			name: "",
			phoneNumber: "",
			foundRecords: true,
			displayedRecords: [],
		});
	}

	handleSearchRecords() {
		const { name, phoneNumber } = this.state;
		console.log(`Going to search for: ${name} and ${phoneNumber}`);
		let foundRecords = this.findFuzzyRecords({
			name: name,
			phoneNumber: phoneNumber,
		});
		console.log(`Here is what we found: ${JSON.stringify(foundRecords)}`);
		if (foundRecords.length === 0) {
			console.log('Did not find any records!');
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

	handleDelete(recordId) {
		console.log(`Handling delete, recordId is: ${recordId}`);
		this.deleteRecord({
			id: recordId,
		});
		this.handleSearchRecords();
	}

  render() {
    return (
			<React.Fragment>
				<CssBaseline />
				<div className="App">
					<NavBar handler={this.handler}>
					</NavBar>
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
