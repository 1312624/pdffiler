import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../client-route';

export default class App extends Component {
    render() {
        return (
            <Router history={browserHistory} routes={routes} onUpdate={ () => window.scrollTo(0, 0)} />
        );
    }
}