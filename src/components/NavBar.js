import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/mapprops';
import { Menu, Icon } from 'antd';

const MenuItem = Menu.Item;

@connect(mapStateToProps, mapDispatchToProps)
class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    signout() {
        document.cookie = `token=;expires=${new Date(0)}`;
        this.props.setToken(false);
        window.location.reload();
    }
    menuClickHandler = ({ key }) => {
        switch (key) {
            case 'signout':
                this.signout();
                break;
            case 'list':
                this.props.history.push('/home/list');
                break;
            case 'me':
                // TODO
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <Menu mode='horizontal' onClick={this.menuClickHandler}>
                <MenuItem key='signout'>
                    <Icon type="poweroff" theme="outlined" />sign out
</MenuItem>
                <MenuItem key='list'>
                    <Icon type="mail" />list
</MenuItem>
                <MenuItem key='me'>
                    <Icon type="user" theme="outlined" />me
</MenuItem>
            </Menu>

        );
    }
};

export default NavBar;