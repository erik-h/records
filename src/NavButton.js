import React from 'react';
import Button from '@material-ui/core/Button';

class NavButton extends React.Component {
	render() {
		return (
			<Button onClick={this.props.onClick} className="nav-bar-button" variant="contained" color="primary">
				{this.props.children}
			</Button>
		);
	}
}

export default NavButton;
