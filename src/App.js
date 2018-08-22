import React from 'react';
import BookIcon from '@material-ui/icons/Book';

import './App.css';
import AddRecordDialog from './AddRecordDialog';
import DeleteRecordDialog from './DeleteRecordDialog';
import SearchRecordDialog from './SearchRecordDialog';
import NavBar from './NavBar';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.handler = this.handler.bind(this);
		this.state = {
			showAdd: false,
			showDelete: false,
			showSearch: false,

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

	handleCloseAddDialog(shouldAdd) {
		console.log(`shouldAdd is: ${shouldAdd}`);
		const newName = this.state.name;
		const newPhoneNumber = this.state.phoneNumber;
		this.setState({
			showAdd: false,
			name: "",
			phoneNumber: "",
		});

		if (!shouldAdd) {
			return;
		}
		else if (this.validName(newName) && this.validPhoneNumber(newPhoneNumber)) {
			console.log('Doing all the important adding stuff...');
			console.log(`newRecord name is: ${JSON.stringify(this.state.name)}`);
			console.log(`newRecord phone number is: ${JSON.stringify(this.state.phoneNumber)}`);
		}
		else {
			console.error('New record is invalid! It will not be added');
		}

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
      </div>
    );
  }
}

export default App;
