/**
* 课本选择公共组件
*/
// 问题记录：级联选择器默认值设置不上

import React from 'react';
import { Cascader, Row, Col, TreeSelect } from 'antd';
import { get_textbooks, get_onebook, get_child_node } from '../services/home';
import './style/choose_textbook.less';
// import { Icon, Menu, Divider} from 'antd';

class ChooseTextbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_book: '',
      current_chapter: undefined,
      book_list: [],
      chapter_list: [{
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [{
          title: 'Child Node1',
          value: '0-0-1',
          key: '0-0-1',
        }, {
          title: 'Child Node2',
          value: '0-0-2',
          key: '0-0-2',
        }],
      }, {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
      }],
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
      console.table(res.data)
    }
  }

  /** 更改课本 */
  changeTextbook(value) {
    console.log(value);
    this.get_onebook(value[4]);
    // console.log(res);
  }

  /** 选择章节 */
  async changeChapter(value) {
    await this.setState({current_chapter: value});
  }

  render(){
   return (
     <div className="choose_textbook_model">
       <Row>
        <Col span={4}>
          <p>当前课本：{this.state.current_book}</p>
        </Col>
        <Col span={8}>
          <span className="label">更换课本</span>
          <Cascader className="choosebook" defaultValue={this.state.default_value} options={this.state.book_list} onChange={this.changeTextbook.bind(this)}
            placeholder="请选择课本" />
        </Col>
        <Col span={12}>
          <span className="label">选择章节</span>
          <TreeSelect
            style={{ width: 300 }}
            value={this.state.current_chapter}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={this.state.chapter_list}
            placeholder="请选择章节"
            treeDefaultExpandAll
            onChange={this.changeChapter.bind(this)}
          />
        </Col>
       </Row>
     </div>
   )
  }
}
export default ChooseTextbook