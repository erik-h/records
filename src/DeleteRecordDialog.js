import React from 'react';

import DeleteRecordButton from './DeleteRecordButton';
import SearchRecordDialog from './SearchRecordDialog';

class DeleteRecordDialog extends React.Component {
	render() {
		return (
			<SearchRecordDialog
					{...this.props}
					recordModifier={<DeleteRecordButton onClick={this.props.onDelete}/>}
			/>
		);
	}
}

export default DeleteRecordDialog;
