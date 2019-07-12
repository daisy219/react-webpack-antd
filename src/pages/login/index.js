import React from 'react';
import { Input, Button, message } from 'antd';
import { login_web } from '../../services/login';
import { Token, setCookie } from '../../utils/utils.ts';

import './index.less';
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
    if (!Token() || Token()==='null') {
      this.setState({isLogin: false});
    } else {
      this.setState({isLogin: true});
    }
  }
  nameChange(event) {
    this.setState({userName: event.target.value});
  }
  passChange(event) {
    this.setState({password: event.target.value});
  }
  async login() {
    login_web({username: this.state.userName, password: this.state.password}).then((data) => {
      if (data.data.code === 200) {
        message.info('登录成功');
        this.setState({isLogin: true});
        this.props.history.replace('/teacher');
        setCookie('platform_token', data.data.token);
        var storage = null;
          if (window.localStorage) {              //判断浏览器是否支持localStorage
            storage = window.localStorage;     
            storage.setItem("termid", data.data.data.termVos[0].termid);    //调用setItem方法，存储数据
            storage.setItem('platform_token',data.data.token);
            // alert(storage.getItem("termid"));     //调用getItem方法，弹框显示 name 为 Rick
            // storage.removeItem("termid");     //调用removeItem方法，移除数据
            // alert(storage.getItem("termid"));   //调用getItem方法，弹框显示 name 为 null
          }
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