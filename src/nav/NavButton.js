import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

/**
 * A button to be used within a navigation bar.
 */
class NavButton extends React.Component {
	static propTypes = {
		onClick: PropTypes.func.isRequired,
		children: PropTypes.node.isRequired,
	};

	render() {
		return (
			<Button onClick={this.props.onClick} className="nav-bar-button" variant="contained" color="primary">
				{this.props.children}
			</Button>
		);
	}
}

export default NavButton;
