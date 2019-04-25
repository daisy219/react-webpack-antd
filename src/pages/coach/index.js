import React from 'react';
import { Cascader } from 'antd';
import { get_textbooks, get_onebook } from '../../services/home';

class Coach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_book: '',
      book_list: [],
    }
  }
  componentWillMount() {
    this.get_textbooks();
  }
  async get_textbooks () {
    const res = await get_textbooks({source: 1, termid: window.localStorage.getItem("termid")});
      if (res.code===200) {
          // console.log(res.data)
          this.setState({current_book: res.data.bookData.tbname})
          this.setState({default_value: [res.data.bookData.stageid, res.data.bookData.subjectid, 
            res.data.bookData.gradeid, res.data.bookData.itemid, res.data.bookData.bookid]})
          // console.log(this.state.default_value)
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
      this.setState({book_list: book_list})
    }
  }
  async get_onebook(bookid) {
    const res = await get_onebook({bookid: bookid});
    if (res.code===200) {
      this.setState({current_book: res.data.tbname})
    }
  }
  onChange(value) {
    // console.log(value);
    this.get_onebook(value[4])
    // console.log(res);
  }
  render() {
    return (
      <div>
        <p>当前课本：{this.state.current_book}</p>
        <span className="label">请选择课本</span>
        <Cascader defaultValue={this.state.default_value} options={this.state.book_list} onChange={this.onChange.bind(this)}
          placeholder="请选择课本" />
      </div>
    )
  }
}
export default Coach