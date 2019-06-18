/**
*  选择班级及学生多选框组件
*/
import React from 'react';
import { Icon, Checkbox } from 'antd';
import { get_student } from '../../../services/home';
function changeStuCheck(e) {
  console.log(e)
  // console.log(props)
}
const StudentList = (props) => {
  if ( props.stu_show && props.stu_list && props.stu_list.length!==0 ) {
    const stu_checkbox = props.stu_list.map((item) => 
      <div key={item.id}>
        <Checkbox className="fl" onChange={changeStuCheck} options={props.plainOptions}>{item.name}</Checkbox>
      </div>
    )
    return (stu_checkbox)
  } else {
    return null
  }
}
class ClassCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // stu_show: false,
    }
  }

  async get_student(item) {
    // console.log(item)
    this.props.changeShow()
    if (!item.stu_list) {
      const res = await get_student(item.classid)
      if (res.code===200) {
        this.props.changeList(item, res.data)
      }
    }
  }

  render() {
    const checkbox = this.props.list.map((item) => 
    <div key={item.classid}>
      <Checkbox onChange={this.props.changebox} value={item}>{item.classname}</Checkbox>
      <span onClick={this.get_student.bind(this, item)} className="cursor_pointer">指定学生
      {this.props.stu_show ? <Icon type="caret-up" /> : <Icon type="caret-down" />}
      </span>
      <StudentList stu_list={item.stu_list} stu_show={this.props.stu_show} plainOptions={item.plainOptions}/>
    </div>
    )
    return (
      checkbox
    )
  }
}
export default ClassCheckbox