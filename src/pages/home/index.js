import React from 'react';
// import { Icon, Menu, Divider} from 'antd';
import MainMenu from '../../components/menu'

class Home extends React.Component{
    constructor(props) {
        super(props)

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