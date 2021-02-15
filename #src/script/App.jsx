import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
} from 'react-router-dom';
import Main from './component/Main.jsx';
import OurPets from './component/our-pets/OurPets.jsx';
// import PropsTypes from 'prop-types'
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

function App() {
	return (
		<>
			<Router>
				<Route exact path='/' component={Main} />
				<Route path='/our-pets' component={OurPets} />
			</Router>
		</>
	);
}

ReactDOM.render(<App />, document.querySelector('#root'));
