import React from 'react';
import './index.less';
import { Checkbox, Row, Col, Button, Table, Input, Icon } from 'antd';
import ChooseTextbook from '../../components/choose_textbook';
import { get_coach_list } from '../../services/coach';
import { get_teach_class, get_student } from '../../services/home';
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
const StudentList = (props)=> {
  if ( props.stu_show ) {
    const stu_checkbox = props.stu_list.map((item) => 
      <div key={item.id}>
        <Checkbox className="fl">{item.name}</Checkbox>
      </div>
    )
    return (stu_checkbox)
  } else {
    return null
  }
}
/** 选择班级及学生多选框组件 */
class ClassCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stu_show: false,
    }
  }
  async get_student(item) {
    // console.log(item)
    if(!item.stu_list) {
      const res = await get_student(item.classid)
      if (res.code===200) {
        this.props.changeList(item, res.data)
      }
    }
    this.setState({stu_show: !this.state.stu_show})
  }

  render() {
    const checkbox = this.props.list.map((item) => 
    <div key={item.classid}>
      <Checkbox onChange={changebox} value={item}>{item.classname}</Checkbox>
      <span onClick={this.get_student.bind(this, item)} className="cursor_pointer">指定学生
      {this.state.stu_show ? <Icon type="caret-up" /> : <Icon type="caret-down" />}
      </span>
      <StudentList stu_list={item.stu_list} stu_show={this.state.stu_show}/>
    </div>
    )
    return (
      checkbox
    )
  }
}
function changebox(e) {
  console.log(e)
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
      class_list: [],
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
    console.log('ww')
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
    console.log('dd')

    await this.setState({nodeid: nodeid})
    await this.setState({params: {...this.state.params, nodecode: nodeid[0]}})
    this.get_coach_list();
  }

  /** 新建作业辅导 */
  async newCoach() {
   this.setState({show_add_dialog: true})
   const res = await get_teach_class({bookid:this.state.bookid})
   if (res.code===200) {
    this.setState({class_list: res.data.classes})
    console.log(res.data.classes)
    // ClassCheckbox(res.data.classes)
   }
  }
  changeList(current_class, stu_list) {
    // console.log(current_class, stu_list)
    let class_list = this.state.class_list;
    class_list && class_list.forEach((item, index) => {
      console.log(item.classid, current_class.classid)
      if(item.classid === current_class.classid) {
        class_list[index].stu_list = stu_list;
        console.log(class_list)
      }
    })
    this.setState({class_list: class_list})
    // console.log(this.state.class_list)
  }

  /** 关闭新建弹框 */
  handleCancel() {
    this.setState({show_add_dialog: false})
  }
  handleOk() {
    this.setState({show_add_dialog: false})
  }
  render() {
    const bookid = this.state.bookid;
    const nodeid = this.state.nodeid;
    const show_add_dialog = this.state.show_add_dialog;
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
        <BaseDialog show={show_add_dialog}
          title='新建作业辅导'
          handleCancel={this.handleCancel.bind(this)}
          handleOk={this.handleOk.bind(this)}
        >
          <Row>
            <Col span={4}><span className="label"><i className="red_color">* </i>名称</span></Col>
            <Col span={20}><Input placeholder="请输入名称"></Input></Col>
          </Row>
          <ClassCheckbox list={this.state.class_list} changeList={this.changeList.bind(this)}/>
        </BaseDialog>
      </div>
    )
  }
}
export default Coach