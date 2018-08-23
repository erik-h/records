import React from 'react';

import BookIcon from '@material-ui/icons/Book';

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
		};
	}

	handler(newState) {
		this.setState(newState);
	}

	validName(name) {
		return name;
	}

	validPhoneNumber(phoneNumber) {
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
		}, undefined) + 1;
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
			if (testSubject.hasOwnProperty(prop) || testSubject[prop].contains(master[prop])) {
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

  render() {
    return (
      <div className="App">
				<NavBar handler={this.handler}>
				</NavBar>
				<div id="project-info">
					<BookIcon className="book-logo" color="primary" />
					<p><b>TODO</b>, this will contain some info about the project.</p>
					<p>Show add is: {this.state.showAdd ? "true" : "false"}</p>
					<p>Show error snackbar is: {this.state.showErrorSnackbar ? "true" : "false"}</p>
				</div>
				<AddRecordDialog
					open={this.state.showAdd}
					onClose={this.handleCloseAddDialog.bind(this, false)}
					onChange={this.handleChange.bind(this)}
					handleCancel={this.handleCloseAddDialog.bind(this, false)}
					handleAdd={this.handleCloseAddDialog.bind(this, true)}
				/>
				<DeleteRecordDialog
				/>
				<SearchRecordDialog
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
    );
  }
}

export default App;
