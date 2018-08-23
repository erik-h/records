import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

class ErrorSnackbar extends React.Component {
	render() {
		return (
				<Snackbar
					open={this.props.open}
					onClose={this.props.onClose}
					autoHideDuration={this.props.autoHideDuration}
				>
					<SnackbarContent
						className="error"
						aria-describedby="client-snackbar"
						message={
							<span id="client-snackbar" style={{display: 'flex', alignItems: 'center'}}>
								<ErrorIcon />
								{this.props.children}
							</span>
						}
						action={[
							<IconButton
								key="close"
								aria-label="Close"
								color="inherit"
								onClick={this.props.onClick}
							>
							<CloseIcon />
							</IconButton>,
						]}
					/>
				</Snackbar>
		);
	}
}

export default ErrorSnackbar;
