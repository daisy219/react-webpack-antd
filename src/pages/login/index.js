import React from 'react';
import { Input, Button, message } from 'antd';
import { login_web } from '../../services/login'
import { Token } from '../../utils/utils'
import { Redirect } from 'react-router-dom';

import './index.less'
// import imgURL from '../../assets/image/bg.jpg';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      isLogin: false
    };
    this.nameChange = this.nameChange.bind(this);
    this.passChange = this.passChange.bind(this);
  }
  componentWillMount() {
    if (Token()) {
      this.setState({isLogin: true})
    } else {
      this.setState({isLogin: false})
    }
  }
  nameChange(event) {
    this.setState({userName: event.target.value})
    console.log(this.state.value)
  }
  passChange(event) {
    this.setState({password: event.target.value})
  }
  async login() {
    console.log('触发')
    login_web({username: this.state.userName, password: this.state.password}).then((data) => {
      if (data.data.code===200) {
        message.info('登录成功');
        this.setState({isLogin: true})
        this.props.history.replace('/teacher');
      } else {
        message.info(data.data.msg);
      }
      // 用户名   10293210666
    })
  }
  render() {
    if (!this.state.isLogin) {
      return (
        <div className="login_model">
          {/* <img src={require('../../assets/image/bg2.jpg')}></img> */}
          <div className="login_box">
            <Input placeholder="请输入用户名" value={this.state.userName} onChange={this.nameChange}/>
            <Input placeholder="请输入密码" value={this.state.password} onChange={this.passChange}/>
            <div className="loginBtn">
              <Button type="primary" onClick={this.login.bind(this)} onKeyDown={(e) => {console.log(e.keyCode)}}>登录</Button>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Login