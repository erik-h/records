import React from 'react';
import AddIcon from '@material-ui/icons/Add';

import NavButton from './NavButton';

class AddRecordButton extends React.Component {
	handleClick() {
		// alert('Adding!');
		this.props.handler({showAdd: true});
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
