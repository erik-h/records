import React from 'react';
import ReactDOM from 'react-dom';
import { render, mount, shallow } from 'enzyme';
import DialogContent from '@material-ui/core/Dialog';

import App from '../common/App';
import AddRecordButton from '../nav/AddRecordButton';
import AddRecordDialog from '../dialog/AddRecordDialog';
import DeleteRecordButton from '../nav/DeleteRecordButton';
import DeleteRecordDialog from '../dialog/DeleteRecordDialog';
import DeleteSingleRecordButton from '../dialog/DeleteSingleRecordButton';
import RecordsTable from '../dialog/RecordsTable';
import SearchRecordDialog from '../dialog/SearchRecordDialog';
import SearchRecordButton from '../nav/SearchRecordButton';

/**
 * Fill in the given dummy name and phone number into the given Dialog component.
 * @param {Object} wrapper an enzyme React Wrapper, representing the main <App />
 * @param {React.Component} dialogComponent
 * @param {string} dummyName
 * @param {string} dummyPhoneNumber
 * @return {React.Component} the instance of the given dialog component, found within the main <App />
 */
function dialogTypeValues(wrapper, dialogComponent, dummyName, dummyPhoneNumber) {
		// Grab the name and phone number inputs from the add dialog
		const dialog = wrapper.find(dialogComponent);
		const nameField = dialog.find('input[name="name"]');
		const phoneNumberField = dialog.find('input[name="phoneNumber"]');

		// Insert the dummy name and phone number
		nameField.simulate('change', {
			target: {
				name: 'name',
				value: dummyName,
			}
		});
		phoneNumberField.simulate('change', {
			target: {
				name: 'phoneNumber',
				value: dummyPhoneNumber,
			}
		});

	return dialog;
}

function clickAddRecord(wrapper) {
	wrapper.find(AddRecordButton).simulate('click');
}

function clickDeleteRecord(wrapper) {
	wrapper.find(DeleteRecordButton).simulate('click');
}

function clickSearchRecord(wrapper) {
	wrapper.find(SearchRecordButton).simulate('click');
}

function testAddInvalid(wrapper, invalidName, invalidPhoneNumber) {
		const addRecordDialog = dialogTypeValues(wrapper, AddRecordDialog, invalidName, invalidPhoneNumber);

		// Click the "Add" button
		const addButton = addRecordDialog.find('button[name="addButton"]');
		addButton.simulate('click');
		// Ensure the add dialog remains open, and that the error snackbar pops up
		expect(wrapper.state('showAdd')).toEqual(true);
		expect(wrapper.state('showErrorSnackbar')).toEqual(true);
}

describe('<App />', () => {
	// Instance of our app, setup before each test
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<App />);
	});

	it('renders without crashing', () => {
		render(<App />);
	});

	describe('Add', () => {
		it('adds a new record', () => {
			clickAddRecord(wrapper);

			const dummyName = 'Foo Bob';
			const dummyPhoneNumber = '8905551234';
			const addRecordDialog = dialogTypeValues(wrapper, AddRecordDialog, dummyName, dummyPhoneNumber);

			// Ensure the App state was correctly updated with the new name and phone number
			expect(wrapper.state('name')).toEqual(dummyName);
			expect(wrapper.state('phoneNumber')).toEqual(dummyPhoneNumber);

			// Click the "Add" record button
			const addButton = addRecordDialog.find('button[name="addButton"]');
			addButton.simulate('click');
			// Ensure no error occurred that prompted the a snackbar
			expect(wrapper.state('showErrorSnackbar')).toEqual(false);
			// Ensure we clear out the name and phone number after clicking the add button
			expect(wrapper.state('name')).toEqual("");
			expect(wrapper.state('phoneNumber')).toEqual("");
		});

		it('cancels adding a new record', () => {
			clickAddRecord(wrapper);

			const dummyName = 'Foo Bob';
			const dummyPhoneNumber = '8905551234';
			const addRecordDialog = dialogTypeValues(wrapper, AddRecordDialog, dummyName, dummyPhoneNumber);

			// Ensure the App state was correctly updated with the new name and phone number
			expect(wrapper.state('name')).toEqual(dummyName);
			expect(wrapper.state('phoneNumber')).toEqual(dummyPhoneNumber);

			// Click the "Cancel" button
			const cancelButton = addRecordDialog.find('button[name="cancelButton"]');
			cancelButton.simulate('click');
			// Ensure we clear out the name and phone number after clicking the add button
			expect(wrapper.state('name')).toEqual("");
			expect(wrapper.state('phoneNumber')).toEqual("");
		});

		it('doesn\'t add invalid records', () => {
			clickAddRecord(wrapper);

			testAddInvalid(wrapper, '', '');
			testAddInvalid(wrapper, '', '1234');
			testAddInvalid(wrapper, 'Foo Bob', '');
			testAddInvalid(wrapper, '', 'not a phone number!');
			testAddInvalid(wrapper, 'Foo Bob', 'not a phone number!');
		});
	});

	describe('Delete', () => {
		it('deletes a record', () => {
			clickAddRecord(wrapper);

			const dummyName = 'Foo Bob';
			const dummyPhoneNumber = '8905551234';
			const addRecordDialog = dialogTypeValues(wrapper, AddRecordDialog, dummyName, dummyPhoneNumber);
			// Add a dummy record
			addRecordDialog.find('button[name="addButton"]').simulate('click');

			clickDeleteRecord(wrapper);
			const deleteRecordDialog = dialogTypeValues(wrapper, DeleteRecordDialog, dummyName, dummyPhoneNumber);
			// Search for the record we just added
			deleteRecordDialog.find('button[name="searchButton"]').simulate('click');

			// TODO: move this deletion testing into test for <RecordsTable />
			// specifically; the deletion functionality is not directly part of the
			// <App /> component
			const displayedRecords = wrapper.state('displayedRecords');
			// Ensure that the record we want to delete is currently being displayed
			const addedRecord = wrapper.state('displayedRecords').find((record) => {
				// TODO: this should probably check for matching ID instead of just name
				// and phone number
				return record.name === dummyName && record.phoneNumber === dummyPhoneNumber;
			});
			// Ensure the record we just added was found in our search
			expect(addedRecord).toBeDefined();

			// Mount a records table for us to throw our records into
			const recordsTable = mount(
				<RecordsTable
					records={wrapper.state('displayedRecords')}
					recordModifier={<DeleteSingleRecordButton onClick={(e) => {
						// We can hardcode the record's ID here because we ensure we're
						// clicking the _right_ button by `.find()`-ing by ID below.
						deleteRecordDialog.props().onDelete(addedRecord.id);
					}}/>}
				/>
			);
			// Find the delete button for the record we just added
			const deleteButton = recordsTable.find(DeleteSingleRecordButton, {
				id: addedRecord.id,
			});
			// Delete the record!
			deleteButton.simulate('click');

			// Ensure that the record we added has been successfully deleted
			expect(wrapper.state('displayedRecords').find((record) => {
				return record.name === dummyName && record.phoneNumber === dummyPhoneNumber;
			})).not.toBeDefined();
		});
	});

	describe('Search', () => {
		it('displays search results for records', () => {
			clickAddRecord(wrapper);

			const dummyName = 'Foo Bob';
			const dummyPhoneNumber = '8905551234';
			const addRecordDialog = dialogTypeValues(wrapper, AddRecordDialog, dummyName, dummyPhoneNumber);
			// Add a dummy record
			addRecordDialog.find('button[name="addButton"]').simulate('click');

			clickSearchRecord(wrapper);
			const searchRecordDialog = dialogTypeValues(wrapper, SearchRecordDialog, dummyName, dummyPhoneNumber);
			// Search for the record we just added
			searchRecordDialog.find('button[name="searchButton"]').simulate('click');

			const displayedRecords = wrapper.state('displayedRecords');
			// Ensure that the record we search for is currently being displayed
			const addedRecord = wrapper.state('displayedRecords').find((record) => {
				// TODO: this should probably check for matching ID instead of just name
				// and phone number
				return record.name === dummyName && record.phoneNumber === dummyPhoneNumber;
			});
			// Ensure the record we just added was found in our search
			expect(addedRecord).toBeDefined();
		});
	});
})
