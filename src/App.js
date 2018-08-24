import React from 'react';

import BookIcon from '@material-ui/icons/Book';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import AddRecordDialog from './AddRecordDialog';
import DeleteRecordDialog from './DeleteRecordDialog';
import ErrorSnackbar from './ErrorSnackbar';
import SearchRecordDialog from './SearchRecordDialog';
import NavBar from './NavBar';
import RecordStats from './RecordStats';

let mockDB = window.mockDB = [
	{
		id: 1000000000,
		created: new Date(),
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

			addedDates: mockDB.map(record => record.created).sort((dateA, dateB) => dateA - dateB),
			deletedDates: [],
			averageRecordsAdded: 0,
			averageRecordsDeleted: 0,
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
		newRecord = {
			id: this.findNextID(),
			created: new Date(),
			...newRecord
		};
		mockDB.push(newRecord);
		console.log(`mockDB is now: ${JSON.stringify(mockDB)}`);
		this.setState({
			addedDates: [...this.state.addedDates, newRecord.created],
		});
	}

	sameDay(a, b) {
		return a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate();
	}

	sameHour(a, b) {
		return a.getHours() === b.getHours();
	}

	calculateAveragePerHour(dates) {
		console.log(`dates is: ${dates}`);
		const sortedDates = [...dates].sort((dateA, dateB) => {
			return dateA - dateB;
		});
		console.log(`sortedDates is: '${sortedDates}'`);

		if (sortedDates.length === 0) {
			return 0;
		}
		let totalHours = 1;
		let currentDate = sortedDates[0];
		for (const date of sortedDates) {
			// console.log(`date is ${date}, currentDate is ${currentDate}`);
			if (!this.sameDay(date, currentDate) || !this.sameHour(date, currentDate)) {
				// If the two sequential dates we're looking at are on different
				// days and/or at different times, we've got a new hour to count
				totalHours++;
			}
			currentDate = date;
		}

		return sortedDates.length / totalHours;
	}

	calculateAverageDeleted() {
		let sortedDeletedDates = this.state.deletedDates.sort((dateA, dateB) => {
			return dateA - dateB;
		});
		this.setState({
			averageRecordsDeleted: this.calculateAveragePerHour(sortedDeletedDates),
		});
	}

	calculateAverageAdded() {
		console.log(`mockDB is: ${JSON.stringify(mockDB)}`);
		let sortedAddedDates = this.state.addedDates.sort((dateA, dateB) => {
			return dateA - dateB;
		});

		console.log(`ADDED DATES IS: ${sortedAddedDates}`);

		this.setState({
			averageRecordsAdded: this.calculateAveragePerHour(sortedAddedDates),
		});
	}

	deleteRecord(record) {
		// Find the index in our mock DB that matches the given ID to delete
		let recordIndex = mockDB.findIndex((element) => {
			// Search through each of the properties that must match
			return this.allPropsMatch(element, record);
		});
		// TODO: deal with case where recordIndex is -1 because we don't find the record
		// Delete the record from the mock DB
		let deletedRecord = mockDB.splice(recordIndex, 1)[0];
		console.log(`Deleted record: ${JSON.stringify(deletedRecord)}`);
		this.setState({
			deletedDates: [...this.state.deletedDates, deletedRecord.created],
		});
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

	updateAverages() {
		this.calculateAverageAdded();
		this.calculateAverageDeleted();
	}

  render() {
    return (
			<React.Fragment>
				<CssBaseline />
				<div className="App">
					<NavBar handler={this.handler}>
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
