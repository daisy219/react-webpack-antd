import React from 'react';
import { Icon, Menu} from 'antd';
import { Link } from 'react-router-dom';
import MainRouter from '../router/teacher';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class MainMenu extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            current: 'home'
        }
        this.handleClick = this.handleClick.bind(this)
    }
    async test() {
        // const res = await http.get(api_address + '/auth/efficiencyLogin?username=102932001&password=123456&roletype=2')
        // console.log(res)
    }
    handleClick(e) {
        this.setState({ current: e.key})
    }
    render(){
        // this.test()
        return (
            <div className="fff">
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="home">
                        <Link to='/' >主页</Link>
                    </Menu.Item>
                    <Menu.Item key="coach">
                        <Link to='/coach/6'>作业辅导</Link>
                    </Menu.Item>
                    <Menu.Item key="worry">
                        <Link to='/wrong'>错题集</Link>
                    </Menu.Item>
                    <Menu.Item key="work">
                        <Link to='/work'>网络作业</Link>
                    </Menu.Item>
                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />更多</span>}>
                    <MenuItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </MenuItemGroup>
                    </SubMenu>
                </Menu>
                {/* <ul>
                    <li><Link to='/home' >Home</Link></li>
                    <li><Link to='/coach/6'>coach</Link></li>
                    <li><Link to='/worry'>worry</Link></li>
                    <li><Link to='/work'>work</Link></li>
                </ul> */}
            </div>
        )
  }
}
export default MainMenu