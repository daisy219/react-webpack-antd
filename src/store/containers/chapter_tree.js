/**
* 存储章节树容器组件
*/
import React from 'react';
import { Tree } from 'antd';
import { connect } from 'react-redux';
import { chapter_tree } from '../action/index';
import { get_child_node } from '../../services/home';

class ChapterTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tree_data: [],
    }
  }
  async componentWillMount() {
    const book_id = await this.props.book_id;
    this.get_child_node(book_id, 'chaper');
    // this.props.select_book()
    // console.log(this.props)
  }
// METHODS


  render(){
    // console.log(this.props)
    return (
      <div>{this.props.book_id}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  current_chapter: state.chapter_change
})

const mapDispatchToProps = dispatch => ({
  redux_chapter_change: info => dispatch(chapter_tree(info))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChapterTree)
