import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import NavButton from './NavButton';

/**
 * A button for searching for and displaying records.
 */
class SearchRecordButton extends React.Component {
	static propTypes = {
		updateAppState: PropTypes.func.isRequired,
	};

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
