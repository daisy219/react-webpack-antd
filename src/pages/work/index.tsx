import React, { useState, useEffect } from 'react';
import { message, Row, Col, Button, Table } from 'antd';
import BookAndChapterTree from '@/components/book_and_chapter';

function Work() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [bookid] = useState(0);
  const [nodeid] = useState(0);
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   document.title = `You clicked ${count} times`;
  // });
  const changeNode = (value: number) => {
    console.log(value);
  };
  const getCurrentBook = (value: number) => {
    console.log(value);
    // await this.setState({bookid: bookId});
    // const params = {
    //   page: 1,
    //   pageline: 10,
    //   bookId,
    // };
    // await this.setState({params});
    // this.get_coach_list();
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
        <Col span={18}>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </Col>
      </Row>
    </div>
  );
}
export default Work;
