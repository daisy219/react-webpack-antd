/**
* 课本选择公共组件
*/
// 问题记录：级联选择器默认值设置不上

import React from 'react';
import { Cascader, Row, Col, Tree  } from 'antd';
import { get_textbooks, get_onebook, get_child_node } from '../services/home';
import './style/choose_textbook.less';
import ChooseTextbook from '../store/containers/textbook';
// import { Icon, Menu, Divider} from 'antd';
const { TreeNode } = Tree;
class BookAndChapterTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_book: '',
      current_chapter: undefined,
      book_list: [],
      current_node: {},
      tree_data: [],
    };
  // this.method = this.method.bind(this);
  }
  componentWillMount() {
    this.get_textbooks();

  }
  async get_textbooks () {
    const res = await get_textbooks({source: 1, termid: window.localStorage.getItem("termid")});
      if (res.code===200) {
          // console.log(res.data)
          this.setState({current_book: res.data.bookData.tbname})
          let book_list = [];
          book_list = res.data.stageData.reduce((pre, cur) => {
            pre.push({label: cur.stage, value: cur.stageid, children: cur.subjectList})
            return pre;
          }, [] )
          book_list && book_list.forEach(item => {
            item.children = item.children.reduce((pre, cur) => {
              pre.push({label: cur.subject, value: cur.subjectid, children: cur.gradeList})
              return pre
            }, [])
            item.children && item.children.forEach(it => {
              it.children = it.children.reduce((pre, cur) => {
                pre.push({label: cur.gradename, value: cur.gradeid, children: cur.items})
                return pre
              }, [])
              it.children && it.children.forEach(publish => {
                publish.children = publish.children.reduce((pre, cur) => {
                  pre.push({label: cur.name, value: cur.itemid, children: cur.bookList})
                  return pre
                }, [])
                publish.children && publish.children.forEach(book => {
                  book.children = book.children.reduce((pre, cur) => {
                    pre.push({label: cur.tbname, value: cur.bookid})
                    return pre
                  }, [])
                })
              })
            })
          })
      await this.setState({book_list: book_list})
      await this.setState({default_value: [res.data.bookData.stageid, res.data.bookData.subjectid, 
        res.data.bookData.gradeid, res.data.bookData.itemid, res.data.bookData.bookid]})
      this.props.getCurrentBook(res.data.bookData.bookid)
      this.get_onebook(this.props.bookid)
    }
  }
  async get_onebook(bookid) {
    const res = await get_onebook({bookid: bookid});
    if (res.code===200) {
      this.setState({current_book: res.data.tbname})
      await this.get_child_node(bookid, 'charper')
      this.setState({tree_data: this.state.current_node})
    }
  }
  
  /** 获取章节节点 */
  async get_child_node(id, type) {
    let res = ''
    if (type === 'charper') {
      res = await get_child_node({bookid: id});
    } else {
      res = await get_child_node({nodeid: id});
    }
    if (res.code === 200) {
      // console.log(res.data)
      const node_list = res.data;
      let tree_data = [];
      node_list.forEach((item) => {
        tree_data.push({title: item.nodename, key: item.nodecode, other_data: item})
      })
      await this.setState({current_node: tree_data})
    }
  }

  /** 更改课本 */
  changebook(value) {
    // console.log(this.state.current_book)
    this.props.changeTextbook(value).then(() =>{
      this.get_onebook(this.props.bookid);
    })
    // console.log(res);
  }

  /** 选择章节 */
  onLoadData = async (treeNode) => {
    // console.log(treeNode.props)
    if (treeNode.props.children) {
      return;
    }
    if (treeNode.props.dataRef.other_data.isHaveChild) {
      await this.get_child_node(treeNode.props.eventKey, 'node')
      treeNode.props.dataRef.children = this.state.current_node;

      this.setState({
        tree_data: [...this.state.tree_data],
      });
    }
  }
  onSelect(selectedKeys, e) {
    this.props.changeNode(selectedKeys).then(()=>{
      // console.log(this.props.nodeid, 'load')
    })
  }
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} dataRef={item} />;
  })

  render(){
   return (
     <div className="choose_textbook_model">
        {/* <p>当前课本：{this.state.current_book}</p> */}
          <ChooseTextbook default_value={this.state.default_value} 
            book_list={this.state.book_list}
            changebook={this.changebook.bind(this)}
            current_bookname={this.state.current_book}/>
        <Tree loadData={this.onLoadData}
          showLine={true}
          onSelect={this.onSelect.bind(this)}
          > 
          {this.renderTreeNodes(this.state.tree_data)}
        </Tree>
     </div>
   )
  }
}
export default BookAndChapterTree