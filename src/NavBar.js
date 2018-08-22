import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import AddRecordButton from './AddRecordButton.js';
import DeleteRecordButton from './DeleteRecordButton.js';
import SearchRecordButton from './SearchRecordButton.js';
import Toolbar from '@material-ui/core/Toolbar';

class NavBar extends React.Component {
	render() {
		return (
			<AppBar position="static">
				<Toolbar>
					<AddRecordButton handler={this.props.handler}></AddRecordButton>
					<DeleteRecordButton handler={this.props.handler}></DeleteRecordButton>
					<SearchRecordButton handler={this.props.handler}></SearchRecordButton>
				</Toolbar>
			</AppBar>
		);
	}
}

export default NavBar;
