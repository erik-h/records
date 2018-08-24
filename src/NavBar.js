import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import AddRecordButton from './AddRecordButton.js';
import DeleteRecordsButton from './DeleteRecordsButton.js';
import SearchRecordButton from './SearchRecordButton.js';
import Toolbar from '@material-ui/core/Toolbar';

/**
 * A navigation bar containing buttons for adding, deleting, and searching for
 * and displaying records.
 */
class NavBar extends React.Component {
	render() {
		return (
			<AppBar position="static">
				<Toolbar>
					<AddRecordButton updateAppState={this.props.updateAppState}></AddRecordButton>
					<DeleteRecordsButton updateAppState={this.props.updateAppState}></DeleteRecordsButton>
					<SearchRecordButton updateAppState={this.props.updateAppState}></SearchRecordButton>
				</Toolbar>
			</AppBar>
		);
	}
}

export default NavBar;
