import React from 'react';
import './index.less';
import { Checkbox, Row, Col, Button, Table, Input, Icon } from 'antd';
import BookAndChapterTree from '../../components/book_and_chapter';
import { get_coach_list } from '../../services/coach';
import { get_teach_class } from '../../services/home';
import NewCoach from './_part/new_coach';

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
      show_add_dialog: false,  // 新建作业辅导弹框
      params: {
        page: 1,
        pageline: 10,
      },
      coach_list: [],
      class_list: [],
      stu_show: false,  // 是否展示新建弹框中班级学生列表
      plainOptions: [], // 选中的学生
      checked_class: [], // 选中的班级
    }
  }
  componentWillMount() {
    // this.getCurrentBook();
    const words = ['safadf', 'daf', 'asfdfas', 'eee', 'cccvc'];
    const result = words.filter(word => word.length > 3);
  }

  /** 获取当前课本 */
  async getCurrentBook(bookId) {
    await this.setState({bookid: bookId});
    const params = {
      page: 1,
      pageline: 10,
      bookId: bookId
    }
    await this.setState({params: params});
    this.get_coach_list();
  }

  /** 获取作业辅导列表 */
  async get_coach_list() {
    const res = await get_coach_list(this.state.params);
    if (res.code === 200) {
      this.setState({coach_list: res.data.datalist});
    }
  }

  /** 点击章节节点 */
  async changeNode(nodeid) {
    await this.setState({nodeid: nodeid});
    await this.setState({params: {...this.state.params, nodecode: nodeid[0]}});
    this.get_coach_list();
  }

  /** 新建作业辅导 */
  async newCoach() {
    this.setState({checked_class: []});
    this.setState({show_add_dialog: true});
    this.setState({stu_show: false});
    const res = await get_teach_class({bookid:this.state.bookid});
    if (res.code===200) {
      this.setState({class_list: res.data.classes});
      console.log(res.data.classes);
      // ClassCheckbox(res.data.classes)
    }
  }

  /** 控制是否展示具体学生名单 */
  changeShow() {
    this.setState({stu_show: !this.state.stu_show});
  }

  /** 关闭新建弹框 */
  handleCancel() {
    this.setState({show_add_dialog: false});
  }

  /** 新建作业辅导提交 */
  submit() {
    this.setState({show_add_dialog: false});
  }

  /** 点击班级checkbox */
  changebox(e) {
    if (e.checked) {
      const checked_class = [];
      checked_class.push();
    }
    console.log(e.target);
  }

  /** 班级列表中加入学生 */
  changeList(current_class, stu_list) {
    // console.log(current_class, stu_list)
    let class_list = this.state.class_list;
    class_list && class_list.forEach((item, index) => {
      console.log(item.classid, current_class.classid)
      if(item.classid === current_class.classid) {
        const options = [];
        class_list[index].stu_list = stu_list;
        stu_list.forEach(stu => { 
          options.push(stu.name)
        })
        class_list[index].options = options;
        console.log(class_list)
      }
    })
    this.setState({class_list: class_list})
    console.log(this.state.class_list)
  }

  render() {
    const bookid = this.state.bookid;
    const nodeid = this.state.nodeid;
    const show_add_dialog = this.state.show_add_dialog;
    return (
      <div className="coach_model">
        <Row>
          <Col span={6}>
            <BookAndChapterTree
              
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
        <NewCoach 
          show_add_dialog={show_add_dialog} 
          class_list={this.state.class_list}
          stu_show={this.state.stu_show}
          changeList={this.changeList.bind(this)}
          changeShow={this.changeShow.bind(this)}
          changebox={this.changebox.bind(this)}
          handleCancel={this.handleCancel.bind(this)}
          submit={this.submit.bind(this)}
          ></NewCoach>
      </div>
    )
  }
}
export default Coach