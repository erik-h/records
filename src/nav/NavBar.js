import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import AddRecordButton from './AddRecordButton';
import DeleteRecordButton from './DeleteRecordButton';
import SearchRecordButton from './SearchRecordButton';
import Toolbar from '@material-ui/core/Toolbar';

/**
 * A navigation bar containing buttons for adding, deleting, and searching for
 * and displaying records.
 */
class NavBar extends React.Component {
	static propTypes = {
		updateAppState: PropTypes.func.isRequired,
	};

	render() {
		return (
			<AppBar position="static">
				<Toolbar>
					<AddRecordButton updateAppState={this.props.updateAppState}></AddRecordButton>
					<DeleteRecordButton updateAppState={this.props.updateAppState}></DeleteRecordButton>
					<SearchRecordButton updateAppState={this.props.updateAppState}></SearchRecordButton>
				</Toolbar>
			</AppBar>
		);
	}
}

export default NavBar;
