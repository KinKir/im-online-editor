import React, { Component } from 'react';
import http from "../api/index";
import { connect } from 'react-redux';
import mapProps from '../store/map_to_props/index';
import { Form, Input, Button } from 'antd';
import '../assests/css/Login.css';

const FormItem = Form.Item;

@connect(mapProps.mapStateToProps, mapProps.mapDispatchToProps)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
        };
    }
    changeField(key, val) {
        this.setState({
            [key]: val,
        });
    }
    loginToServer = () => {
        http.login({
            name: this.state.name,
            password: this.state.password,
        })
            .then(({ data }) => {
                this.props.setToken(data.success);
                if (data.success) this.props.history.replace('/home');
            });
    }
    render() {
        return (
            <div className='login-container'>
                <Form>
                    <FormItem>
                        <Input value={this.state.name} onChange={e => this.changeField('name', e.target.value)} />
                    </FormItem>
                    <FormItem>
                        <Input type='password' value={this.state.password} onChange={e => this.changeField('password', e.target.value)} />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" block onClick={this.loginToServer}>Login in</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
};

export default Login;