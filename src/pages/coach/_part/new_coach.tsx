/** 新建作业辅导弹框组件 */
import React from 'react';
import './new_coach.less';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { Row, Col, Input, DatePicker } from 'antd';
import BaseDialog from '../../../components/base_dialog';
import ClassCheckbox from './class_check';
import { new_coach } from '../../../services/coach';

interface NewCoachStateType {
  params: {
    bookid: number;
    shared: number;
    name: string;
    stime: string;
    publishClass: any[];
  }
}
class NewCoach extends React.Component<PROPS.NewCoachPropsType, NewCoachStateType> {
  constructor(props: PROPS.NewCoachPropsType) {
    super(props);
    this.state = {
      params: {
        bookid: 0,
        shared: 2, // 不共享
        name: '',
        stime: '',
        publishClass: [],
      },
    };
  // this.method = this.method.bind(this);
  }

  private change_start_date(date, dateString) {
    const params = {
      bookid: this.props.bookid,
      name: this.state.params.name,
      shared: this.state.params.shared,
      stime: dateString,
    };
    this.setState({params});
  }
  private change_coach_name(event: any) {
    event.persist();
    const params = {
      bookid: this.props.bookid,
      name: event.target.value,
      shared: this.state.params.shared,
      stime: this.state.params.stime,
    }
    this.setState({params});
  }
  private async submit() {
    const class_list = this.props.class_list;
    const publishClass: any[] = [];
    class_list.forEach((item: any) => {
      if ( item.class_all_check || (item.checked_stu_list && item.checked_stu_list.length !== 0) ) {
        publishClass.push({classId: item.classid, stuIds: item.class_all_check ? [] : item.checked_stu_list});
      }
    });
    const params = {
      bookid: this.props.bookid,
      name: this.state.params.name,
      stime: this.state.params.stime,
      shared: this.state.params.shared,
      publishClass,
    };
    await this.setState({params});
    const res = await new_coach(this.state.params);
    if ( res.code === 200 ) {
      this.props.submit();
    }
  }
// METHODS

  public render() {
   return (
     <div>
        <BaseDialog show={this.props.show_add_dialog}
          wrapClassName='new_coach_dialog'
          title='新建作业辅导'
          handleCancel={this.props.handleCancel}
          handleOk={this.submit.bind(this)}
        >
          <Row>
            <Col className='label' span={4}><span><i className='red_color'>* </i>名称:</span></Col>
            <Col span={20}><Input placeholder='请输入名称' onChange={this.change_coach_name.bind(this)} value={this.state.params.name}></Input></Col>
          </Row>
          <ClassCheckbox
            list={this.props.class_list}
            changeList={this.props.changeList}
            changeStuCheck={this.props.changeStuCheck}
            change_class_check={this.props.change_class_check}
          />
          <Row>
            <Col className='label' span={4}><span>开始时间:</span></Col>
            <Col span={20}>
              <DatePicker locale={locale} onChange={this.change_start_date.bind(this)} />
            </Col>
          </Row>
        </BaseDialog>
     </div>
   );
  }
}
export default NewCoach;
