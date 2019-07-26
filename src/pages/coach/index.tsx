import React from 'react';
import './index.less';
import { message, Row, Col, Button, Table } from 'antd';
import BookAndChapterTree from '@/components/book_and_chapter';
import { get_coach_list } from '@/services/coach';
import { get_teach_class } from '@/services/home';
import NewCoach from './_part/new_coach';

interface CoachStateType {
  bookid: number;
  nodeid: number;
  show_add_dialog: boolean;
  params: {
    page: number;
    pageline: number;
    nodecode?: number;
    bookId?: number;
  };
  coach_list: any[];
  class_list: any[];
  plainOptions: any[];
  checked_class: any[];
}

const report_locale = {
  emptyText: '暂无数据',
};
  /** 作业辅导监控 */
const monitor = () => {
};
const report_columns = [
  {title: '作业辅导名称', dataIndex: 'name', key: 'name'},
  {title: '创建时间', dataIndex: 'createdAt', key: 'createdAt'},
  {
    title: '操作',
    key: 'action',
    render: () => (
      <span>
        <Button onClick={monitor}>监控</Button>
        <Button className='table_btn'>编辑</Button>
      </span>
    ),
  },
];
const row_selection = {
  type: 'checkbox',
};

class Coach extends React.Component<any, CoachStateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      bookid: 0,
      nodeid: 1,
      show_add_dialog: false,  // 新建作业辅导弹框
      params: {
        page: 1,
        pageline: 10,
        nodecode: 0,
        bookId: 0,
      },
      coach_list: [],
      class_list: [],
      // stu_show: false,  // 是否展示新建弹框中班级学生列表
      plainOptions: [], // 选中的学生
      checked_class: [], // 选中的班级
    };
  }
  // public componentWillMount() {
    // this.getCurrentBook();
    // const words = ['safadf', 'daf', 'asfdfas', 'eee', 'cccvc'];
    // const result = words.filter(word => word.length > 3);
  // }

  /** 获取当前课本 */
  private async getCurrentBook(bookId: number) {
    await this.setState({bookid: bookId});
    const params = {
      page: 1,
      pageline: 10,
      bookId,
    };
    await this.setState({params});
    this.get_coach_list();
  }

  /** 获取作业辅导列表 */
  private async get_coach_list() {
    const res = await get_coach_list(this.state.params);
    if (res.code === 200) {
      this.setState({coach_list: res.data.datalist});
    }
  }

  /** 点击章节节点 */
  private async changeNode(nodeid: number) {
    await this.setState({nodeid});
    await this.setState({params: {...this.state.params, nodecode: nodeid[0]}});
    this.get_coach_list();
  }

  /** 新建作业辅导 */
  private async newCoach() {
    this.setState({checked_class: []});
    this.setState({show_add_dialog: true});
    // this.setState({stu_show: false});
    const res = await get_teach_class({bookid: this.state.bookid});
    if (res.code === 200) {
      this.setState({class_list: res.data.classes});
    }
  }

  /** 关闭新建弹框 */
  private handleCancel() {
    this.setState({show_add_dialog: false});
  }

  /** 新建作业辅导提交 */
  private submit() {
    message.info('操作成功');
    this.setState({show_add_dialog: false});
    this.get_coach_list();
  }

  /** 点击班级checkbox */
  private change_class_check(e: any) {
    const class_list = this.state.class_list;
    class_list.forEach((item: any, index: number) => {
      if ( e.target.value.classid === item.classid ) {
        if (e.target.checked) {
          item.class_all_check = true;
          item.checked_stu_list = item.all_value_list;
        } else {
          item.class_all_check = false;
          item.checked_stu_list = [];
        }
      }
    });
    this.setState({class_list});
  }
  /** 点击学生checkbox */
  private changeStuCheck(value: any, classid: number) {
    const class_list = this.state.class_list;
    class_list.forEach((item: any) => {
      if ( classid === item.classid ) {
        item.checked_stu_list = value;
        if (value.length === item.all_value_list.length) {
          item.class_all_check = true;
        } else {
          item.class_all_check = false;
        }
      }
    });
    this.setState({class_list});
  }

  /** 班级列表中加入学生 */
  private changeList(current_class: any, stu_list: any[]) {
    // console.log(current_class, stu_list)
    const class_list = this.state.class_list;
    class_list.forEach((item: any, index: number) => {
      // console.log(item.classid, current_class.classid)
      // class_list[index].stu_list_show = false;
      if (item.classid === current_class.classid) {
        // 控制是否展开当前学生列表
        class_list[index].stu_list_show = class_list[index].stu_list_show ? false : true;
        // 如果父组件传过来stu_list，则更新class_list
        if ( stu_list ) {
          const options: EDU.SelectValueType[] = [];
          const all_value_list: number[] = [];
          class_list[index].stu_list = stu_list;
          stu_list.forEach((stu: EDU.StudentList) => {
            options.push({value: stu.id, label: stu.name});
            all_value_list.push(stu.id);
          });
          class_list[index].options = options;
          class_list[index].all_value_list = all_value_list;
          if (class_list[index].class_all_check) {
            item.checked_stu_list = item.all_value_list;
          } else {
            item.checked_stu_list = [];
          }
        }
        // console.log(class_list)
      }
    });
    this.setState({class_list});
    // console.log(this.state.class_list)
  }

  public render() {
    const bookid = this.state.bookid;
    const nodeid = this.state.nodeid;
    const show_add_dialog = this.state.show_add_dialog;
    return (
      <div className='coach_model'>
        <Row>
          <Col span={6}>
            <BookAndChapterTree
              bookid={bookid}
              changeNode={this.changeNode.bind(this)}
              nodeid={nodeid}
              getCurrentBook={this.getCurrentBook.bind(this)}/>
          </Col>
          <Col span={18}>
            <div className='coach_model_content'>
              <div className='common_btn_group'>
                <Button type='primary' onClick={this.newCoach.bind(this)}>新建</Button>
                <Button type='primary' onClick={this.newCoach.bind(this)}>导出</Button>
                <Button type='danger' onClick={this.newCoach.bind(this)}>删除</Button>
              </div>
              <Table
                rowSelection={row_selection}
                locale={report_locale}
                columns={report_columns}
                dataSource={this.state.coach_list}
                size='middle'
                rowKey={(record: any) => record.coachid}
              />
            </div>
          </Col>

        </Row>
        <NewCoach
          bookid={bookid}
          show_add_dialog={show_add_dialog}
          class_list={this.state.class_list}
          changeList={this.changeList.bind(this)}
          change_class_check={this.change_class_check.bind(this)}
          changeStuCheck={this.changeStuCheck.bind(this)}
          handleCancel={this.handleCancel.bind(this)}
          submit={this.submit.bind(this)}
          ></NewCoach>
      </div>
    );
  }
}
export default Coach;
