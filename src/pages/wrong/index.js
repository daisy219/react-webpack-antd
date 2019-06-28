import React from 'react';

import { Checkbox, Row, Col, Button, Table, Input, Icon, Select } from 'antd';

import Footer from '../../components/Footer'
import AddTodo from '../../store/containers/AddTodo'
import VisibleTodoList from '../../store/containers/VisibleTodoList'
import NumDisplay from '../../store/containers/num_display' // redux练习
import BookAndChapterTree from '../../components/choose_textbook'
import SeleteName from '../../store/containers/selete_name'


class Wrong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookid: '',
      nodeid: '',
      current_select: '',
      name_list: [
        {label: 'Jack', value: 'jack'},
        {label: 'Lucy', value: 'lucy'},
        {label: 'Yiminghe', value: 'yiminghe'},
      ]
    }
  }
  componentWillMount() {
  }
  async changeTextbook(value) {
    // console.log(value)
    await this.setState({bookid: value[4]})
    // await this.setState({params: {...this.state.params}});
  }
  async changeNode(nodeid) {
    await this.setState({nodeid: nodeid})
    // await this.setState({params: {...this.state.params, nodecode: nodeid[0]}})

  }
  async getCurrentBook(bookId) {
    await this.setState({bookid: bookId})
  }
  changeName(value) {
    this.setState({current_select: value})
    // this.setState({current_value: })
    // console.log(this.props)
    // this.props.selete_name(value);
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
            <BookAndChapterTree
              changeTextbook={this.changeTextbook.bind(this)}
              bookid={bookid}
              changeNode={this.changeNode.bind(this)}
              nodeid={nodeid}
              getCurrentBook={this.getCurrentBook.bind(this)}/>
          </Col>
          <Col span={18}>
            错题集页面{this.state.current_select}
            <AddTodo />
            <VisibleTodoList />
            <Footer />
            <NumDisplay />
            <SeleteName name_list={this.state.name_list} changename={this.changeName.bind(this)}/>

          </Col>
        </Row>
      </div>
    )
  }
}

export default Wrong
