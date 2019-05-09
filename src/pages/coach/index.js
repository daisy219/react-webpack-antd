import React from 'react';
import './index.less';
import { Cascader, Row, Col, Button, Table } from 'antd';
import ChooseTextbook from '../../components/choose_textbook';
import { get_coach_list } from '../../services/coach';

const report_locale = {
  emptyText: '暂无数据'
}

const report_columns = [
  {title: '作业辅导名称', dataIndex: 'name', key: 'name'},
  {title: '创建时间', dataIndex: 'createdAt', key: 'createdAt'},
]
const row_selection = {
  type: 'checkbox'
}

class Coach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookid: '',
      nodeid: '',
      params: {
        page: 1,
        pageline: 10,
      },
      coach_list: [],
    }
  }
  componentWillMount() {
    this.get_coach_list();
  }
  async get_coach_list() {
    const res = await get_coach_list({page: 1,pageline: 10, bookId: 10001199});
    console.log(res);
    if (res.code === 200) {
      this.setState({coach_list: res.data.datalist})
    }
  }

  /** 新建作业辅导 */
  newCoach() {

  }
  render() {
    return (
      <div className="coach_model">
        <Row>
          <Col span={6}>
            <ChooseTextbook />
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
                bordered
                size="middle"
                rowKey={record => record.userid}
              />
            </div>
          </Col>

        </Row>
      </div>
    )
  }
}
export default Coach