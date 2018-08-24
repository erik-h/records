import React from 'react';
import PropTypes from 'prop-types';

import DeleteSingleRecordButton from './DeleteSingleRecordButton';
import SearchRecordDialog from './SearchRecordDialog';

/**
 * A Dialog for prompting the user to search for and delete records.
 */
class DeleteRecordDialog extends React.Component {
	static propTypes = {
		onDelete: PropTypes.func.isRequired,
	};

	render() {
		return (
			<SearchRecordDialog
					{...this.props}
					recordModifier={<DeleteSingleRecordButton onClick={this.props.onDelete}/>}
			/>
		);
	}
}

export default DeleteRecordDialog;
