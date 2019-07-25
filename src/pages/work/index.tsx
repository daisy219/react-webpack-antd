import React, { useState, useEffect } from 'react';
import { DatePicker, Row, Col, Input, Button } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import './index.less';
import BookAndChapterTree from '@/components/book_and_chapter';
import { SelectFun } from '@/components/comment_com';
import { get_work_list } from '@/services/work';

const { RangePicker } = DatePicker;
const Search = Input.Search;

function Work() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [bookid] = useState(0);
  const [nodeid] = useState(0);
  const [params] = useState({
    jobstatus: 0,
    page: 1,
    pageline: 8,
    bookid: 10003062,
  });
  const [workList, setWorklist] = useState([]);
  const statusList = [
    {label: '全部', value: 0},
    {label: '未发布', value: 1},
    {label: '已发布', value: 2},
    {label: '重发', value: 3}];
  const modelList = [
    {label: '教师批阅', value: 1},
    {label: '学生互批', value: 2},
  ];
  const get_work = async () => {
    const result = await get_work_list(params);
    // workList =  result.data.actionInfos;
    // setCount(count + 1);
    setWorklist(result.data.actionInfos);
    // console.log(result.data.actionInfos);
  };
  useEffect(() => {
    // get_work();
    if (!workList || workList.length === 0) {
      get_work();
    }
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    console.log(workList);
  }, []);


  /** 改变章节节点 */
  const changeNode = (value: number) => {
    console.log('11', value);
  };

  /** 修改当前课本 */
  const getCurrentBook = (value: number) => {
    console.log('22', value);
    // await this.setState({bookid: bookId});
    // const params = {
    //   page: 1,
    //   pageline: 10,
    //   bookId,
    // };
    // await this.setState({params});
    // this.get_coach_list();
  };
  const onChangeDateRange = (date: any, dateString: [string, string]) => {
    console.log(dateString);
  };
  const changeStatus = (value: number | string) => {
    console.log(value);
  };
  const changeModel = (value: number | string) => {
    console.log(value);
  };
  const searchByKeyword = (value: string) => {
    console.log(value);
  };
  const newWork = () => {
    console.log('新建');
  };
  return (
    <div className='work_model'>
      <Row>
        <Col span={6}>
          <BookAndChapterTree
              bookid={bookid}
              changeNode={changeNode}
              nodeid={nodeid}
              getCurrentBook={getCurrentBook}/>
        </Col>
        <Col span={18} className='work_model_right'>
          <Row className='search_info'>
            <Col span={10}>
              {/* <span className='label'>搜索</span> */}
              <RangePicker locale={locale} onChange={onChangeDateRange} />
            </Col>
            <Col span={4}>
              <SelectFun list={statusList}
                handleChange={changeStatus}
                label={'label'} value={'value'}
                need_all={false}/>
            </Col>
            <Col span={4}>
              <SelectFun list={modelList}
                  handleChange={changeModel}
                  label={'label'} value={'value'}
                  need_all={true}/>
            </Col>
            <Col span={6}>
              <div className='search fl'>
                <Search
                  placeholder='请输入关键字'
                  onSearch={searchByKeyword}
                  />
              </div>
            </Col>
          </Row>
          <div className='common_btn_group'>
            <Button type='primary' onClick={newWork}>新建</Button>
            <Button type='danger' onClick={newWork}>删除</Button>
          </div>
          <ul className='work_detail'>
          {workList && workList.map((item, index) => {
            return (
              <li className='work_detail_li' key={item.actionid}>
                <p>{item.actionname}</p>
              </li>
            );
          })}
          </ul>
        </Col>
      </Row>
    </div>
  );
}
export default Work;
