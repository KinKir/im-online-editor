import React, { Component } from 'react';
import http from "../api/index";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../store/mapprops';
import { Form, Input, Button, Icon ,message} from 'antd';
import '../assests/css/Login.css';

const FormItem = Form.Item;
let validateOptions = {
    first: true,
    force: true,
};

@Form.create()
@connect(mapStateToProps, mapDispatchToProps)
class Signin extends Component {
    constructor() {
        super();
    }
    loginToServer = (e) => {
        e.preventDefault();
        this.props.form.validateFields(validateOptions, (err, values) => {
            if (!err) {
                http.register({
                    name: values.username.trim(),
                    password: values.password,
                })
                    .then(({ data }) => {
                        if (data.success) {
                            message.success("注册成功");
                            this.props.history.replace('/login');
                        } else {
                            message.error(data.message);
                        }
                    });
            }
        });
    }
    render() {
        const { getFieldDecorator, resetFields, getFieldValue } = this.props.form;

        return (
            <div className='login-container'>
                <Form onSubmit={this.loginToServer}>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '请输入用户名' }
                            ],
                            validateTrigger: 'onBlur',
                        })(
                            <Input
                                prefix={<Icon type="user" />}
                                suffix={getFieldValue('username') ? <Icon type="close-circle" onClick={resetFields.bind(null, 'username')} /> : null} />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '请输入密码' }
                            ],
                            validateTrigger: 'onBlur',
                        })(
                            <Input
                                type="password"
                                prefix={<Icon type="lock" />}
                                suffix={getFieldValue('password') ? <Icon type="close-circle" onClick={resetFields.bind(null, 'password')} /> : null} />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">sign in</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
};

export default Signin;