
import React from 'react';
import {
	Bot
} from './containers';
import { Router, Route, browserHistory } from 'react-router';

export const Routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Bot} />
	</Router>
);
