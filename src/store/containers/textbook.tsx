/**
* 存储课本章节树信息容器组件
*/
import React from 'react';
import { Cascader, Tree } from 'antd';
import { connect } from 'react-redux';
import { choose_textbook, save_book_list, change_chapter_tree } from '../action/index';
import { get_onebook, get_textbooks, get_child_node } from '../../services/home';
const { TreeNode } = Tree;

class ChooseTextbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_book: '', // 当前课本名
      book_list: [], // 可选课本列表
      current_node: [], // 当前选择的章节
      tree_data: [], // 章节树数据
    }
  }
  componentWillMount() {
    // redux中没有章节树数据时，采用当前获取的章节树数据
    this.setState({tree_data: this.props.chapter_tree ? this.props.chapter_tree : this.state.tree_data});
    // redux中没有存储课本信息时，再去获取课本信息
    if (!this.props.current_bookinfo) {
      this.get_textbooks();
    } else {
      this.props.getCurrentBook(this.props.current_bookinfo.bookid); // 输出到大模块组件当前课本
    }
  }
  /** 改变课本 */
  async changebook(value) {
    await this.get_onebook(value[4]);
  }

  /** 获取默认课本及课本列表 */
  async get_textbooks () {
    const res = await get_textbooks({source: 1, termid: window.localStorage.getItem("termid")});
      if (res.code===200) {
          let book_list = [];
          book_list = res.data.stageData.reduce((pre, cur) => {
            pre.push({label: cur.stage, value: cur.stageid, children: cur.subjectList});
            return pre;
          }, [] )
          book_list && book_list.forEach(item => {
            item.children = item.children.reduce((pre, cur) => {
              pre.push({label: cur.subject, value: cur.subjectid, children: cur.gradeList});
              return pre;
            }, [])
            item.children && item.children.forEach(it => {
              it.children = it.children.reduce((pre, cur) => {
                pre.push({label: cur.gradename, value: cur.gradeid, children: cur.items});
                return pre;
              }, [])
              it.children && it.children.forEach(publish => {
                publish.children = publish.children.reduce((pre, cur) => {
                  pre.push({label: cur.name, value: cur.itemid, children: cur.bookList});
                  return pre;
                }, [])
                publish.children && publish.children.forEach(book => {
                  book.children = book.children.reduce((pre, cur) => {
                    pre.push({label: cur.tbname, value: cur.bookid});
                    return pre;
                  }, [])
                })
              })
            })
          })
      await this.setState({book_list: book_list});
      this.props.redux_book_list(book_list);
      this.get_onebook(res.data.bookData.bookid);
    }
  }

  /** 获取并存储当前选择的课本信息 */
  async get_onebook(bookid) {
    const res = await get_onebook({bookid: bookid});
    if (res.code===200) {
      this.setState({current_book: res.data.tbname});
      const bookinfo = {
        bookname: res.data.tbname,
        bookid: bookid,
      }
      await this.get_child_node(bookid, 'chapter');
      this.setState({tree_data: this.state.current_node});
      this.props.redux_select_book(bookinfo); // 存到redux
      this.props.getCurrentBook(bookid); // 输出到大模块组件当前课本
    }
  }

  /** 获取章节节点 */
  async get_child_node(id, type) {
    let res = ''
    if (type === 'chapter') {
      res = await get_child_node({bookid: id});
    } else {
      res = await get_child_node({nodeid: id});
    }
    if (res.code === 200) {
      // console.log(res.data)
      const node_list = res.data;
      let tree_data = [];
      node_list.forEach((item) => {
        tree_data.push({title: item.nodename, key: item.nodecode, other_data: item});
      })
      await this.setState({current_node: tree_data});
      this.props.redux_chapter_tree(tree_data);
    }
  }

  /** 选择章节 */
  onLoadData = async (treeNode) => {
    if (treeNode.props.children) {
      return;
    }
    if (treeNode.props.dataRef.other_data.isHaveChild) {
      await this.get_child_node(treeNode.props.eventKey, 'node');
      treeNode.props.dataRef.children = this.state.current_node;

      await this.setState({
        tree_data: [...this.state.tree_data],
      });
      this.props.redux_chapter_tree(this.state.tree_data);
    }
  }

  /** 点击章节节点 */
  onSelect(selectedKeys, e) {
    this.props.changeNode(selectedKeys);
  }

  /** 章节子节点 */
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
  // console.log(this.props)
   return (
     <div>
        <p>当前课本：{this.props.current_bookinfo.bookname ? this.props.current_bookinfo.bookname : this.state.current_book}</p>
        <Cascader className="choosebook"
          options={this.props.textbook_list}
          onChange={this.changebook.bind(this)}
          placeholder="更换课本" />
          <Tree loadData={this.onLoadData}
            showLine={true}
            onSelect={this.onSelect.bind(this)}
            > 
            {this.renderTreeNodes(this.props.chapter_tree ? this.props.chapter_tree : this.state.tree_data)}
          </Tree>
     </div>
   )
  }
}

const mapStateToProps = state => ({
  current_bookinfo: state.change_textbook,
  textbook_list: state.textbook_list,
  chapter_tree: state.chapter_tree,
})

const mapDispatchToProps = dispatch => ({
  redux_select_book: info => dispatch(choose_textbook(info)),
  redux_book_list: list => dispatch(save_book_list(list)),
  redux_chapter_tree: list => dispatch(change_chapter_tree(list))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTextbook)
