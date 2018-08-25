import React from 'react';
import ReactDOM from 'react-dom';
import { render, mount, shallow } from 'enzyme';

import App from '../common/App';
import AddRecordButton from '../nav/AddRecordButton';
import AddRecordDialog from '../dialog/AddRecordDialog';

function addDialogTypeValues(wrapper, dummyName, dummyPhoneNumber) {
		// Grab the name and phone number inputs from the add dialog
		let addRecordDialog = wrapper.find(AddRecordDialog);
		let nameField = addRecordDialog.find('input[name="name"]');
		let phoneNumberField = addRecordDialog.find('input[name="phoneNumber"]');

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

	return addRecordDialog;
}

function clickAddRecord(wrapper) {
		wrapper.find(AddRecordButton).simulate('click');
}

function testAddInvalid(wrapper, invalidName, invalidPhoneNumber) {
		let addRecordDialog = addDialogTypeValues(wrapper, invalidName, invalidPhoneNumber);

		// Click the "Add" button
		let addButton = addRecordDialog.find('button[name="addButton"]');
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

	it('adds a new record', () => {
		clickAddRecord(wrapper);

		const dummyName = 'Foo Bob';
		const dummyPhoneNumber = '8905551234';
		const addRecordDialog = addDialogTypeValues(wrapper, dummyName, dummyPhoneNumber);

		// Ensure the App state was correctly updated with the new name and phone number
		expect(wrapper.state('name')).toEqual(dummyName);
		expect(wrapper.state('phoneNumber')).toEqual(dummyPhoneNumber);

		// Click the "Add" record button
		let addButton = addRecordDialog.find('button[name="addButton"]');
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
		const addRecordDialog = addDialogTypeValues(wrapper, dummyName, dummyPhoneNumber);

		// Ensure the App state was correctly updated with the new name and phone number
		expect(wrapper.state('name')).toEqual(dummyName);
		expect(wrapper.state('phoneNumber')).toEqual(dummyPhoneNumber);

		// Click the "Cancel" button
		let cancelButton = addRecordDialog.find('button[name="cancelButton"]');
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
})
