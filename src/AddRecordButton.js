import React from 'react';
import AddIcon from '@material-ui/icons/Add';

import NavButton from './NavButton';

/**
 * A button which allows the user to input a new record.
 */
class AddRecordButton extends React.Component {
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
