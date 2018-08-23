import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import NavButton from './NavButton';

import './App.css';

class SearchRecordButton extends React.Component {
	handleClick() {
		// alert('Searching!');
		this.props.handler({showSearch: true});
	}

	render() {
		return (
			<NavButton onClick={this.handleClick.bind(this)}>
				<SearchIcon />
			</NavButton>
		);
	}
}

export default SearchRecordButton;
