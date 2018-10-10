import React, { Component } from 'react';
import http from '../api/index';
import {Table} from 'antd';

class List extends Component {
    constructor() {
        super();
        this.state = {
            list: []
        };
        // init
        this.getUserData('');
    }
    getUserData(name) {
        http.getUserList(name)
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        list: data.data
                    })
                } else {
                    this.setState({
                        list: []
                    })
                }
            });
    }
    render() {
        return (
            <div>
                <Table dataSource={this.state.list} columns={[
                    {title: '姓名',dataIndex: 'name'}
                ]} rowKey='id' />
            </div>
        );
    }
};

export default List;