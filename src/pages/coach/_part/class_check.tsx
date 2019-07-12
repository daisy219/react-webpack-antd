/**  选择班级及学生多选框组件 */
import React from 'react';
import { Icon, Checkbox } from 'antd';
import { get_student } from '../../../services/home';

const CheckboxGroup = Checkbox.Group;

interface StudentListStateType {
  checklist: any[];
}
/** 学生列表多选框组 */
class StudentList extends React.Component<PROPS.StudentListPropsType, StudentListStateType> {
  constructor(props: PROPS.StudentListPropsType) {
    super(props);
    this.state = {
      checklist: [],
    };
  }
  private changeStuCheck(value: number) {
    this.props.changeStuCheck(value, this.props.classid);
  }
  public render() {
    if (  this.props.stu_show && this.props.options && this.props.options.length !== 0  ) {
      return (
        <div>
          <CheckboxGroup onChange={this.changeStuCheck.bind(this)} options={this.props.options}
            value={this.props.checked_stu_list}></CheckboxGroup>
        </div>
      );
    } else {
      return null;
    }
  }
}
class ClassCheckbox extends React.Component<PROPS.ClassCheckboxPropsType> {
  constructor(props: PROPS.ClassCheckboxPropsType) {
    super(props);
    this.state = {
      // stu_show: false,
    };
  }

  /** 点击指定学生，控制是否展示学生列表及是否获取学生列表 */
  private async get_student(item: any) {
    if (!item.stu_list) {
      const res = await get_student(item.classid);
      if (res.code === 200) {
        this.props.changeList(item, res.data);
      }
    } else {
      this.props.changeList(item);
    }
  }


  public render() {
    const checkbox = this.props.list.map((item) =>
    <div key={item.classid} className='each_class'>
      <Checkbox onChange={this.props.change_class_check} value={item}
        checked={item.class_all_check}>{item.classname}
      </Checkbox>
      <span onClick={this.get_student.bind(this, item)} className='cursor_pointer'>指定学生
      {item.stu_list_show ? <Icon type='caret-up' /> : <Icon type='caret-down' />}
      </span>
      <StudentList stu_list={item.stu_list} stu_show={item.stu_list_show} options={item.options}
        checked_stu_list={item.checked_stu_list}
        checkedList={item.checkedList} changeStuCheck={this.props.changeStuCheck} classid={item.classid}/>
    </div>,
    );
    return (
      checkbox
    );
  }
}
export default ClassCheckbox;
