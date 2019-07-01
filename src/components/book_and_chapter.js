/**
* 课本选择公共组件
*/
// 问题记录：级联选择器默认值设置不上

import React from 'react';
// import { Cascader, Row, Col, Tree  } from 'antd';
import { get_textbooks, get_onebook, get_child_node } from '../services/home';
import './style/choose_textbook.less';
import ChooseTextbook from '../store/containers/textbook';
// import { Icon, Menu, Divider} from 'antd';
class BookAndChapterTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_chapter: undefined,
      tree_data: [],
      bookid: '',
    };
  // this.method = this.method.bind(this);
  }
  componentWillMount() {
    // this.get_textbooks();
  }

  // async get_onebook(bookid) {
  //   await this.get_child_node(bookid, 'charper')
  //   this.setState({tree_data: this.state.current_node})
  // }

  // emit_bookid(bookid) {
  //   this.setState({bookid: bookid});
  // }
  /** 更改课本 */
  changebook(value) {
    // console.log(value);
    this.props.changeTextbook(value).then(() =>{
      // this.get_onebook(this.props.bookid);
    })
  }

  render(){
   return (
     <div className="choose_textbook_model">
        <ChooseTextbook
          changebook={this.changebook.bind(this)}/>
     </div>
   )
  }
}
export default BookAndChapterTree