/** 主页 */
import React from 'react';
import { Cascader } from 'antd';
import { get_textbooks, get_onebook } from '../../services/home';
import HomeEcharts from './_part/home_charts';
import './index.less';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          current_book: '',
          options: [],
          book_list: [],
          chart_data: [],
        }
    }
    componentWillMount() {
        this.get_textbooks()
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
              this.setState({book_list: book_list})
            }
    }
    async onChange(value) {
      // console.log(value);
      const res = await get_onebook({bookid: value[4]});
      if (res.code===200) {
        this.setState({current_book: res.data.tbname})
      }
      // console.log(res);
    }

    render(){
        // this.test()
      return (
        <div className="home_model">
          <p>当前课本：{this.state.current_book}</p>
          <span className="label">请选择课本</span>
          <Cascader options={this.state.book_list} onChange={this.onChange.bind(this)} placeholder="请选择课本" />
          {/* <img src={require('../../assets/image/bg.jpg')}></img> */}
          <HomeEcharts/>
        </div>
      )
  }
}
export default Home