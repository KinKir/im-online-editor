import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import routerMap from './map';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/mapprops';

@connect(mapStateToProps, mapDispatchToProps)
class RouterView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let path = this.props.location.pathname;

        // '/'-> '/home
        if (path === '/') return <Redirect to='/home' />

        // if can match
        let matchRoute = routerMap.find(item => {
            let url = item.path;
            return new RegExp(`${url}(/|/.*)?$`, 'gi').test(path);
        });

        if (matchRoute) {
            // if need auth
            if (matchRoute.isAuth === true && !this.props.getToken) {
                return <Redirect to='/login' />;
            }
            return <Route exact={!matchRoute.hasChild} path={matchRoute.path} component={matchRoute.component} />
        }
        return <Redirect to='/404' />
    }
}

export default RouterView;