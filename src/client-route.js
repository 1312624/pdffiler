import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import UserPage from './components/UserPage';
import SchoolPage from './components/SchoolPage';

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage}></IndexRoute>
        <Route path="users/:id" component={UserPage}></Route>
        <Route path="schools" component={SchoolPage} ></Route>
    </Route>
);

export default routes;