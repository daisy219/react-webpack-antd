/**
*  选择班级及学生多选框组件
*/
import React from 'react';
import { Icon, Checkbox } from 'antd';
import { get_student } from '../../../services/home';

const CheckboxGroup = Checkbox.Group;

/** 学生列表多选框组 */
class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checklist: [],
    }
  }
  changeStuCheck(value) {
    this.props.changeStuCheck(value, this.props.classid)
  }
  render() {
    if (  this.props.stu_show && this.props.options && this.props.options.length !== 0  ) {
      return (
        <div>
          <CheckboxGroup onChange={this.changeStuCheck.bind(this)} options={this.props.options}
            value={this.props.checked_stu_list}></CheckboxGroup>
        </div>
      )
    } else {
      return null;
    }
  }
}
class ClassCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // stu_show: false,
    }
  }
  componentWillMount() {

  }

  /** 点击指定学生，控制是否展示学生列表及是否获取学生列表 */
  async get_student(item) {
    if (!item.stu_list) {
      const res = await get_student(item.classid);
      if (res.code===200) {
        this.props.changeList(item, res.data);
      }
    } else {
      this.props.changeList(item);
    }
  }


  render() {
    const checkbox = this.props.list.map((item) => 
    <div key={item.classid} className="each_class">
      <Checkbox onChange={this.props.change_class_check} value={item} 
        checked={item.class_all_check}>{item.classname}
      </Checkbox>
      <span onClick={this.get_student.bind(this, item)} className="cursor_pointer">指定学生
      {item.stu_list_show ? <Icon type="caret-up" /> : <Icon type="caret-down" />}
      </span>
      <StudentList stu_list={item.stu_list} stu_show={item.stu_list_show} options={item.options}
        checked_stu_list={item.checked_stu_list} 
        checkedList={item.checkedList} changeStuCheck={this.props.changeStuCheck} classid={item.classid}/>
    </div>
    )
    return (
      checkbox
    )
  }
}
export default ClassCheckbox