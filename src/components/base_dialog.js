/**
* 基础弹框
*/
import React from 'react';
import { Modal, Button } from 'antd';

class BaseDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  showModal() {
  }

  handleOk () {
    this.props.handleOk()
  }

  handleCancel () {
    this.props.handleCancel();
  }
  componentWillMount() {
    
  }
  componentWillUpdate() {
  }
  componentWillReceiveProps() {

  }
// METHODS

  render(){
    return (
      <div>
        <Modal
          visible={this.props.show}
          title={this.props.title}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          footer={[
            <Button key="back" onClick={this.handleCancel.bind(this)}>取消</Button>,
            <Button key="submit" type="primary" onClick={this.handleOk.bind(this)}>
              确定
            </Button>,
          ]}
        >{this.props.children}
        </Modal>
      </div>
    );
  }
}
export default BaseDialog