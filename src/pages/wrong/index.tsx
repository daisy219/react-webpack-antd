import React from 'react';

import { Row, Col } from 'antd';

import Footer from '../../components/Footer';
import AddTodo from '../../store/containers/AddTodo';
import VisibleTodoList from '../../store/containers/VisibleTodoList';
import NumDisplay from '../../store/containers/num_display'; // redux练习
import BookAndChapterTree from '../../components/book_and_chapter.tsx';
import SeleteName from '../../store/containers/selete_name';

interface WrongStateType {
  bookid: number | null;
  nodeid: number | null;
  current_select: string;
  name_list: EDU.SelectValueType[];
}

class Wrong extends React.Component<any, WrongStateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      bookid: null,
      nodeid: null,
      current_select: '',
      name_list: [
        {label: 'Jack', value: 'jack'},
        {label: 'Lucy', value: 'lucy'},
        {label: 'Yiminghe', value: 'yiminghe'},
      ],
    };
  }
  public componentWillMount() {
  }
  private async changeTextbook(value: number[]) {
    // console.log(value)
    await this.setState({bookid: value[4]});
    // await this.setState({params: {...this.state.params}});
  }
  private async changeNode(nodeid: number) {
    await this.setState({nodeid});
    // await this.setState({params: {...this.state.params, nodecode: nodeid[0]}})

  }
  private async getCurrentBook(bookId: number) {
    await this.setState({bookid: bookId});
  }
  private changeName(value: string) {
    this.setState({current_select: value});
    // this.setState({current_value: })
    // console.log(this.props)
    // this.props.selete_name(value);
    // const current_name = {
    //   name:
    // }
    // this.props.
  }
  public render() {
    const bookid = this.state.bookid;
    const nodeid = this.state.nodeid;

    return (
      <div className='wrong_model'>
        <Row>
          <Col span={6}>
            <BookAndChapterTree
              changeTextbook={this.changeTextbook.bind(this)}
              bookid={bookid}
              changeNode={this.changeNode.bind(this)}
              nodeid={nodeid}
              getCurrentBook={this.getCurrentBook.bind(this)}/>
          </Col>
          <Col span={18}>
            错题集页面{this.state.current_select}
            <AddTodo />
            <VisibleTodoList />
            <Footer />
            <NumDisplay />
            <SeleteName name_list={this.state.name_list} changename={this.changeName.bind(this)}/>

          </Col>
        </Row>
      </div>
    );
  }
}

export default Wrong;

