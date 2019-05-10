/**
* 基础弹框
*/
import React from 'react';
import { Modal, Button } from 'antd';

class BaseDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  // this.method = this.method.bind(this);
  }
  showModal() {
    this.setState((prevState, props) =>({
      visible: props.show,
    }));
  }

  handleOk () {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel () {
    this.setState({ visible: false });
  }
  componentWillMount() {
    console.log(this.state.visible)
    this.showModal();
  }
// METHODS

  render(){
    const { visible, loading } = this.state;
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal.bind(this)}>
          Open Modal with customized footer
        </Button> */}
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          footer={[
            <Button key="back" onClick={this.handleCancel.bind(this)}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk.bind(this)}>
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
export default BaseDialog