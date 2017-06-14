import React from "react";
import {Bot} from "./containers";
import {browserHistory, Route, Router} from "react-router";

export const Routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Bot}/>
    </Router>
);
