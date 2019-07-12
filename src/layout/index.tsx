import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import MainRouter from '../router/teacher';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
class LayoutModel extends React.Component {
    public render() {
        return (
            <Layout className='layout'>
                <Header>
                    <div className='logo' />
                    <Menu
                        theme='dark'
                        mode='horizontal'
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key='home'>
                            <Link to='/teacher/home' >主页</Link>
                        </Menu.Item>
                        <Menu.Item key='coach'>
                            <Link to='/teacher/coach/6'>作业辅导</Link>
                        </Menu.Item>
                        <Menu.Item key='wrong'>
                            <Link to='/teacher/wrong'>错题集</Link>
                        </Menu.Item>
                        <Menu.Item key='work'>
                            <Link to='/teacher/work'>作业</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            <MainRouter />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Please Look At Me
                </Footer>
            </Layout>
        );
    }
}
export default LayoutModel;
