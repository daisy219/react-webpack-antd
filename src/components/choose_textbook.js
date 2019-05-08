/**
* 课本选择公共组件
*/
// 问题记录：级联选择器默认值设置不上

import React from 'react';
import { Cascader, Row, Col, Tree  } from 'antd';
import { get_textbooks, get_onebook, get_child_node } from '../services/home';
import './style/choose_textbook.less';
// import { Icon, Menu, Divider} from 'antd';
const { TreeNode } = Tree;
class ChooseTextbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_book: '',
      current_chapter: undefined,
      book_list: [],
      treeData: [
        { title: 'Expand to load', key: '0' },
        { title: 'Expand to load', key: '1' },
        { title: 'Tree Node', key: '2', isLeaf: true },
      ],
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
      console.log(this.state.default_value)
      this.get_onebook(res.data.bookData.bookid)
    }
  }
  async get_onebook(bookid) {
    const res = await get_onebook({bookid: bookid});
    if (res.code===200) {
      this.setState({current_book: res.data.tbname})
      this.get_child_node(bookid)
    }
  }
  
  /** 获取章节节点 */
  async get_child_node(bookid) {
    const res = await get_child_node({bookid: bookid});
    if (res.code === 200) {
      // console.log(res.data)
      const node_list = res.data;
      let treeData = [];
      node_list.forEach((item) => {
        treeData.push({title: item.nodename, key: item.nodecode})
      })
      this.setState({treeData: treeData})
    }
  }

  /** 更改课本 */
  changeTextbook(value) {
    // console.log(value);
    this.get_onebook(value[4]);
    // console.log(res);
  }

  /** 选择章节 */

  onLoadData = treeNode => new Promise((resolve) => {
    if (treeNode.props.children) {
      resolve();
      return;
    }
    setTimeout(() => {
      treeNode.props.dataRef.children = [
        { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
        { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
      ];
      this.setState({
        treeData: [...this.state.treeData],
      });
      resolve();
    }, 1000);
  })
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
        <p>当前课本：{this.state.current_book}</p>
        <Cascader className="choosebook" defaultValue={this.state.default_value} options={this.state.book_list} onChange={this.changeTextbook.bind(this)}
          placeholder="更换课本" />
        <Tree loadData={this.onLoadData} showLine={true}>
          {this.renderTreeNodes(this.state.treeData)}
        </Tree>
     </div>
   )
  }
}
export default ChooseTextbook