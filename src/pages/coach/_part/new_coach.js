/**
* 新建作业辅导弹框组件
*/
import React from 'react';
import { Row, Col, Input } from 'antd';
import BaseDialog from '../../../components/base_dialog';
import ClassCheckbox from './class_check';

class NewCoach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  // this.method = this.method.bind(this);
  }
  componentWillMount() {

  }
// METHODS

  render(){
   return (
     <div>
        <BaseDialog show={this.props.show_add_dialog}
          title='新建作业辅导'
          handleCancel={this.props.handleCancel}
          handleOk={this.props.submit}
        >
          <Row>
            <Col span={4}><span className="label"><i className="red_color">* </i>名称</span></Col>
            <Col span={20}><Input placeholder="请输入名称"></Input></Col>
          </Row>
          <ClassCheckbox 
          list={this.props.class_list} 
          changeList={this.props.changeList} 
          stu_show={this.props.stu_show}
          changeShow={this.props.changeShow}
          changebox={this.props.changebox}
          />
        </BaseDialog>
     </div>
   )
  }
}
export default NewCoach