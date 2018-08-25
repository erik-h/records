import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

import NavButton from './NavButton';

/**
 * A button which allows the user to input a new record.
 */
class AddRecordButton extends React.Component {
	static propTypes = {
		updateAppState: PropTypes.func.isRequired,
	};

	handleClick() {
		this.props.updateAppState({
			showAdd: true,
		});
	}

	render() {
		return (
			<NavButton onClick={this.handleClick.bind(this)}>
				<AddIcon />
			</NavButton>
		);
	}
}

export default AddRecordButton;
