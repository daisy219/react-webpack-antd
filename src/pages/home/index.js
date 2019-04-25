/** 主页 */
import React from 'react';
import { Select, Row, Col, Table, Button, Input, Icon, DatePicker } from 'antd';
import { get_subject, get_report } from '../../services/home';
import './index.less';
const Option = Select.Option;
const {RangePicker} = DatePicker;
const report_columns = [
  {title: '姓名', dataIndex: 'username', key: 'username'},
  {title: '导学本', children: [
    {title: '数量', dataIndex: 'dxnum', key: 'dxnum'},
    {title: '观看人数', dataIndex: 'dxwatchers', key: 'dxwatchers'},
    ]},
  {title: '作业辅导', children: [
    {title: '数量', dataIndex: 'coachnum', key: 'coachnum'},
    {title: '观看人数', dataIndex: 'coachwatchers', key: 'coachwatchers'},
    ]},
  {title: '网络作业', dataIndex: 'hwnum', key: 'hwnum'},
  {title: '题库', dataIndex: 'tknum', key: 'tknum'},
]

/** 下拉框组件 */
function SelectFun(props) {
  const list = props.list;
  const list_item = list.map((item) =>
    <Option key={item.subjectid}>{item.subject}</Option>
  )
  return (
    <Select defaultValue="-1" style={{ width: 120 }} onChange={props.handleChange}>
      <Option value="-1" key="-1">全选</Option>
      {list_item}
    </Select>
  )
}
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          chart_data: [],
          default_value: [],
          subject_list: [],
          get_report_parames: {
            orderby: 1,
            ordertype: 1,
            page: 1,
            pageline: 8,
          },
          report_list: [],
        }
    }
    componentWillMount() {
      this.get_subject();
      this.get_report_list();
    }
    componentDidMount() {
    }

    /** 获取首页列表 */
    async get_report_list() {
      const res = await get_report(this.state.get_report_parames)
      this.setState({report_list: res.data.datalist})
    }
    
    /** 获取科目信息 */
    async get_subject() {
      const res = await get_subject();
      this.setState({subject_list: res.data})
    }

    /** 选择的科目发生变化 */
    handleChange(value) {
      console.log(`selected ${value}`);
    }

    onChangeDateRange(date, dateString) {
      console.log(date, dateString);
    }

    /** 导出 */
    export() {

    }
    render(){
        // this.test()
      return (
        <div className="home_model">
          <Row className="home_model_top">
            <Col span={4}>
              <span className="label">科目</span>
              <SelectFun list={this.state.subject_list} handleChange={this.handleChange.bind(this)}/>
            </Col>
            <Col span={4}>
              <span className="label">排序</span>
              <SelectFun list={this.state.subject_list} handleChange={this.handleChange.bind(this)}/>
            </Col>
            <Col span={7}>
              <span className="label">搜索</span>
              <RangePicker onChange={this.onChangeDateRange.bind(this)} />
            </Col>
            <Col span={7}>
              <span className="label fl">关键字</span>
              <div className="search fl">
                <Input
                  placeholder="Enter your username"
                  suffix={
                      <Icon type="search" style={{ color: 'rgba(0,0,0,.45)' }} />
                    }
                  />
              </div>
              </Col>
            <Col span={2}>
              <Button type="primary" onClick={this.export.bind(this)}>导出</Button>
            </Col>
          </Row>
          {/* <img src={require('../../assets/image/bg.jpg')}></img> */}
          <Table
            columns={report_columns}
            dataSource={this.state.report_list}
            bordered
            size="middle"
          />
        </div>
      )
  }
}
export default Home