import React from 'react';
import { Route } from 'react-router-dom';
import List from './List';
import NavBar from '../components/NavBar';

export default ({ match, history }) => {

    return (
        <>
            <Route exact path={`${match.url}/list`} component={List} />
            <NavBar history={history} />
        </>
    );
};