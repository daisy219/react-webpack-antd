import React from 'react';
// import { Icon, Menu, Divider} from 'antd';
import MainMenu from '../../components/menu'
import { login_web } from '../../services/login'

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
                {/* <MainMenu currentPage='home'/> */}
                首页
                <img src={require('../../assets/image/bg.jpg')}></img>
            </div>
        )
  }
}
export default Home