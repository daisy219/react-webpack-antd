/** 主页 */
import React from 'react';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { Token, use_form_download } from '../../utils/utils'
import { Select, Row, Col, Table, Button, Input, Icon, DatePicker } from 'antd';
import { get_subject, get_report, export_report } from '../../services/home';
import './index.less';

const Search = Input.Search;
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
const report_locale = {
  emptyText: '暂无数据'
}

/** 下拉框组件 */
function SelectFun(props) {
  const list = props.list;
  if (!list) {
    return null
  }
  const list_item = list.map((item) =>
    <Option key={item[props.value]}>{item[props.label]}</Option>
  );
  const option_all = props.need_all ? <Option value="-1" key="-1">全选</Option> : '';
  return (
    <Select defaultValue={props.need_all ? '-1': String(props.list[0].value)} style={{ width: 120 }} onChange={props.handleChange}>
      {option_all}
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
          order_list: [
            {label: '导学本', value: 1},
            {label: '作业辅导', value: 2},
            {label: '导学本+作业辅导', value: 3},
          ]
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
      const res = await get_report(this.state.get_report_parames);
      this.setState({report_list: res.data.datalist})
    }
    
    /** 获取科目信息 */
    async get_subject() {
      const res = await get_subject();
      this.setState({subject_list: res.data});
    }

    /** 选择的科目发生变化 */
    async changeSubject(value) {
      console.log(`selected ${value}`);
      await this.setState({get_report_parames: {...this.state.get_report_parames, orderby: value}});
      console.log(this.state.get_report_parames)
      this.get_report_list();
    }

    /** 选择的排序发生变化 */
    async changeOrder(value) {
      // console.log(`selected ${value}`);
      await this.setState({get_report_parames: {...this.state.get_report_parames, ordertype: value}});
      this.get_report_list();
    }

    /** 选择搜索时间 */
    async onChangeDateRange(date, dateString) {
      await this.setState({get_report_parames: 
        {...this.state.get_report_parames, stime: dateString[0] + ' 00:00:00', etime: dateString[1] + ' 00:00:00'}});
      this.get_report_list();
    }

    /** 关键词搜索 */
    async searchByKeyword(value, e) {
      await this.setState({get_report_parames: {...this.state.get_report_parames, kw: value}});
      this.get_report_list();
    }

    /** 导出 */
    async export() {
      const api = await export_report()
      const params = Object.assign(this.state.get_report_parames, {token: Token()})
      console.log(params)
      use_form_download('get', api, params)
    }
    render(){
        // this.test()
      return (
        <div className="home_model">
          <Row className="home_model_top">
            <Col span={10}>
              <span className="label">科目</span>
              <SelectFun list={this.state.subject_list} 
              handleChange={this.changeSubject.bind(this)} 
              label={'subject'} value={'subjectid'}
              need_all={true}/>
            </Col>
            <Col span={10}>
              <span className="label" style={{marginRight: '24px'}}>排序</span>
              <SelectFun list={this.state.order_list} 
              handleChange={this.changeOrder.bind(this)}
              label={'label'} value={'value'}
              need_all={false}/>
            </Col>

            <Col span={4}>
              <Button type="primary" onClick={this.export.bind(this)}>导出</Button>
            </Col>
          </Row>
          <Row className="home_model_top">
            <Col span={10}>
              <span className="label">搜索</span>
              <RangePicker locale={locale} onChange={this.onChangeDateRange.bind(this)} />
            </Col>
            <Col span={14}>
              <span className="label fl">关键字</span>
              <div className="search fl">
                <Search
                  placeholder="请输入关键字"
                  onSearch={this.searchByKeyword.bind(this)}
                  />
              </div>
            </Col>
          </Row>
          {/* <img src={require('../../assets/image/bg.jpg')}></img> */}
          <Table
            locale={report_locale}
            columns={report_columns}
            dataSource={this.state.report_list}
            bordered
            size="middle"
            rowKey={record => record.userid}
          />
        </div>
      )
  }
}
export default Home