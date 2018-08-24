import React from 'react';

import DeleteSingleRecordButton from './DeleteSingleRecordButton';
import SearchRecordDialog from './SearchRecordDialog';

/**
 * A Dialog for prompting the user to search for and delete records.
 */
class DeleteRecordDialog extends React.Component {
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
