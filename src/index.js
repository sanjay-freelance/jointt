import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './app';


function JointtProfile(props){
	return (
	<BrowserRouter>
		<App/>
	</BrowserRouter>
	)
}

// spa
ReactDOM.render(<JointtProfile/>, document.getElementById('app'));



