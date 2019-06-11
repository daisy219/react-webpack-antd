import React from 'react';
import { Checkbox, Row, Col, Button, Table, Input, Icon, Select } from 'antd';

import Footer from '../../components/Footer'
import AddTodo from '../../store/containers/AddTodo'
import VisibleTodoList from '../../store/containers/VisibleTodoList'
import NumDisplay from '../../store/containers/num_display' // redux练习
import ChooseTextbook from '../../components/choose_textbook'

const { Option } = Select;

class Worry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookid: '',
      nodeid: '',
      name_list: [
        {name: 'Jack', value: jack},
        {name: 'Lucy', value: lucy},
        {name: 'Yiminghe', value: yiminghe},
      ]
    }
  }
  async changeTextbook(value) {
    await this.setState({bookid: value[4]})
    await this.setState({params: params});
  }
  async changeNode(nodeid) {
    await this.setState({nodeid: nodeid})
    await this.setState({params: {...this.state.params, nodecode: nodeid[0]}})

  }
  async getCurrentBook(bookId) {
    await this.setState({bookid: bookId})
  }
  handleChange(value) {
    console.log(`selected ${value}`);
    // const current_name = {
    //   name: 
    // }
    // this.props.
  }
  render() {
    const bookid = this.state.bookid;
    const nodeid = this.state.nodeid;

    return (
      <div className="wrong_model">
        <Row>
          <Col span={6}>
            <ChooseTextbook
              changeTextbook={this.changeTextbook.bind(this)}
              bookid={bookid}
              changeNode={this.changeNode.bind(this)}
              nodeid={nodeid}
              getCurrentBook={this.getCurrentBook.bind(this)}/>
          </Col>
          <Col span={18}>
            错题集页面
            <AddTodo />
            <VisibleTodoList />
            <Footer />
            <NumDisplay />
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
            </Select>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Worry