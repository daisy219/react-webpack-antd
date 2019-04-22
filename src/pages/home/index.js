import React from 'react';
// import { Icon, Menu, Divider} from 'antd';
<<<<<<< HEAD
// import MainMenu from '../../components/menu'
import { login_web } from '../../services/login'
import { Input, Button, message } from 'antd';
=======
import MainMenu from '../../components/menu'
>>>>>>> 0478d7a30210ce5e8062fb1643e0b8b8447aa228

class Home extends React.Component{
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.login()
    }
    async login () {
        login_web({username: 10293210666,password: 123456}).then((data) => {
            if (data.data.code===200) {
                console.log(data.data)
                this.setCookie('platform_token', data.data.token)
            }
            // 用户名   10293210666
          })
    }
    setCookie(name,value) {
        document.cookie = name + '=' + escape(value);
        console.log(name,value)
    }
    readcookie() {
        console.log(this.getCookie('platform_token'))
    }
    getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则匹配
        if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
        }
        else{
        return null;
        }
    } 

    render(){
        // this.test()
        return (
            <div>
<<<<<<< HEAD
                {/* <MainMenu/> */}
                首页    
                {/* <img src={require('../../assets/image/bg.jpg')}></img> */}
                <Button type="primary" onClick={this.readcookie.bind(this)}>cookie</Button>

=======
                {/* <MainMenu currentPage='home'/> */}
                首页
                <img src={require('../../assets/image/bg.jpg')}></img>
>>>>>>> 0478d7a30210ce5e8062fb1643e0b8b8447aa228
            </div>
        )
  }
}
export default Home