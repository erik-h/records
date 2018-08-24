import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import NavButton from './NavButton';

/**
 * A button for searching for and displaying records.
 */
class SearchRecordButton extends React.Component {
	handleClick() {
		this.props.updateAppState({
			showSearch: true,
		});
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
