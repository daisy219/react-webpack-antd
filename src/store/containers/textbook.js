/**
* 存储课本信息容器组件
*/
import React from 'react';
import { Cascader } from 'antd';
import { connect } from 'react-redux';
import { choose_textbook } from '../action/index';

class ChooseTextbook extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // this.props.select_book()
    console.log(this.props)
  }
// METHODS
changebook(value) {
  // console.log(value)
  const bookinfo = {
    bookname: this.props.current_bookname,
    bookid: value[4],
    bookpay: value
  }
  this.props.changebook(value)

  // console.log(bookinfo)
  this.props.select_book(bookinfo);

  console.log(this.props)
}
  render(){
   return (
     <div>
        <p>当前课本：{this.props.current_bookname}</p>
        <Cascader className="choosebook" 
          defaultValue={this.props.current_bookinfo.bookpay}
          // bookinfo={this.props.current_bookinfo}
          options={this.props.book_list}
          onChange={this.changebook.bind(this)}
          placeholder="更换课本" />
          {/* <span>{this.props.current_bookinfo}</span> */}
     </div>
   )
  }
}

const mapStateToProps = state => ({
  current_bookinfo: state.change_textbook
})

const mapDispatchToProps = dispatch => ({
  select_book: info => dispatch(choose_textbook(info))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTextbook)
