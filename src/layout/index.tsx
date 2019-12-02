import React from 'react';
// import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';
import MainRouter from '@/router/main';
import { modules } from '@/constant/modules';
// const { Header, Content, Footer } = Layout;
const menu_item = modules.map((item, index) =>
	<div className='menu_item' key={item.name}>
		<Link to={item.path}>{item.name}</Link>
	</div>,
);
class LayoutModel extends React.Component {

	public render() {
		return (
			<div className='main_layout'>
				<div className='main_header'>
					{menu_item}
				</div>
				<div className='main_content'>
					<div>
						<MainRouter />
					</div>
				</div>
				<div className='main_footer'>
					Please Look At Me
				</div>
			</div>
		);
	}
}
export default LayoutModel;
