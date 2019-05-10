import React from 'react';
import './index.less';
import { Cascader, Row, Col, Button, Table } from 'antd';
import ChooseTextbook from '../../components/choose_textbook';
import { get_coach_list } from '../../services/coach';
import BaseDialog from '../../components/base_dialog';

const report_locale = {
  emptyText: '暂无数据'
}
  /** 作业辅导监控 */
const monitor = ()=> {

}
const report_columns = [
  {title: '作业辅导名称', dataIndex: 'name', key: 'name'},
  {title: '创建时间', dataIndex: 'createdAt', key: 'createdAt'},
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button onClick={monitor}>监控</Button>
        <Button className="table_btn">编辑</Button>
      </span>
    ),
  }
]
const row_selection = {
  type: 'checkbox'
}

class Coach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookid: '',
      nodeid: '1',
      show_add_dialog: false,
      params: {
        page: 1,
        pageline: 10,
      },
      coach_list: [],
    }
  }
  componentWillMount() {
    this.getCurrentBook()
    
  }
  async getCurrentBook(bookId) {
    await this.setState({bookid: bookId})
    const params = {
      page: 1,
      pageline: 10,
      bookId: bookId
    }
    await this.setState({params: params})
    this.get_coach_list();
  }
  async get_coach_list() {
    const res = await get_coach_list(this.state.params);
    if (res.code === 200) {
      this.setState({coach_list: res.data.datalist});
    }
  }
  async changeTextbook(value) {
    const params = {
      page: 1,
      pageline: 10,
      bookId: value[4]
    }
    // console.log(value)
    await this.setState({bookid: value[4]})
    await this.setState({params: params});
    this.get_coach_list();
    // const nodeid = this.state.nodeid;
  }
  async changeNode(nodeid) {

    await this.setState({nodeid: nodeid})
    await this.setState({params: {...this.state.params, nodecode: nodeid[0]}})
    this.get_coach_list();
  }

  /** 新建作业辅导 */
  newCoach() {
    this.setState({show_add_dialog: true})
    // console.log(this.state.show_add_dialog)
  }

  render() {
    const bookid = this.state.bookid;
    const nodeid = this.state.nodeid;
    return (
      <div className="coach_model">
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
            <div className="coach_model_content">
              <div className="btn_group">
                <Button type="primary" onClick={this.newCoach.bind(this)}>新建</Button>
                <Button type="primary" onClick={this.newCoach.bind(this)}>导出</Button>
                <Button type="danger" onClick={this.newCoach.bind(this)}>删除</Button>
              </div>
              <Table
                rowSelection={row_selection}
                locale={report_locale}
                columns={report_columns}
                dataSource={this.state.coach_list}
                size="middle"
                rowKey={record => record.coachid}
              />
            </div>
          </Col>

        </Row>
        <BaseDialog show={this.state.show_add_dialog}
          showClick={this.newCoach}
        />
      </div>
    )
  }
}
export default Coach