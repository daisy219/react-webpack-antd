import React from 'react';
// import { Icon, Menu, Divider} from 'antd';
import MainMenu from '../../components/menu'
import { login_web } from '../../services/login'
import { setCookie } from '../../utils/utils'

class Home extends React.Component{
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        // this.login()
    }
    async login () {
        login_web({username: 10293210666,password: 123456}).then((data) => {
            if (data.data.code===200) {
                console.log(data.data)
                setCookie('platform_token', data.data.token)
            }
            // 用户名   10293210666
          })
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