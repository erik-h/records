import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';

import './NavBar.css';

class NavBar extends React.Component {
	render() {
		return (
			<AppBar position="static">
				<Toolbar>
					<Button className="nav-bar-button" variant="contained" color="primary">
						<AddIcon />
					</Button>
					<Button className="nav-bar-button" variant="contained" color="primary">
						<DeleteIcon />
					</Button>
					<Button className="nav-bar-button" variant="contained" color="primary">
						<SearchIcon />
					</Button>
				</Toolbar>
			</AppBar>
		);
	}
}

export default NavBar;
