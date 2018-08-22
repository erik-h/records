import React from 'react';
import BookIcon from '@material-ui/icons/Book';

import './App.css';
import NavBar from './NavBar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
				<NavBar>
				</NavBar>
				<div id="project-info">
					<BookIcon className="book-logo" color="primary" />
					<p><b>TODO</b>, this will contain some info about the project.</p>
				</div>
      </div>
    );
  }
}

export default App;
