import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import NavButton from './NavButton';

import './App.css';

class SearchRecordButton extends React.Component {
	handleClick() {
		alert('Searching!');
	}

	render() {
		return (
			<NavButton onClick={this.handleClick}>
				<SearchIcon />
			</NavButton>
		);
	}
}

export default SearchRecordButton;
