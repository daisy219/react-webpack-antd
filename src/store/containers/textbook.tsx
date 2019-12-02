/** 存储课本章节树信息容器组件 */
import React from 'react';
import { Tree, Cascader } from 'antd';
import { connect } from 'react-redux';
import { choose_textbook, save_book_list, change_chapter_tree } from '../action/index';
import { get_onebook, get_textbooks, get_child_node } from '../../services/home';
// import { number } from 'prop-types';
const { TreeNode } = Tree;
interface TextbookStateType {
  current_book: string;
  book_list: PROPS.BookListPropsType[];
  current_node: EDU.NodeDataType[];
  tree_data: any;
}
class ChooseTextbook extends React.Component<PROPS.TextbookPropsType, TextbookStateType> {
  constructor(props: PROPS.TextbookPropsType) {
    super(props);
    this.state = {
      current_book: '', // 当前课本名
      book_list: [], // 可选课本列表
      current_node: [], // 当前选择的章节
      tree_data: [], // 章节树数据
    };
  }
  public componentWillMount() {
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
  private async changebook(value: any) {
    await this.get_onebook(value[4]);
  }

  /** 获取默认课本及课本列表 */
  private async get_textbooks() {
    const res = await get_textbooks({source: 1, termid: Number(window.localStorage.getItem('termid'))});
    if (res.code === 200) {
      let book_list = [];
      book_list = res.data.stageData.reduce((pre: any, cur: any) => {
        pre.push({label: cur.stage, value: cur.stageid, children: cur.subjectList});
        return pre;
      }, [] );
      if (!book_list) {
        return;
      }
      // console.log(book_list);
      book_list.forEach((item: any) => {
        item.children = item.children.reduce((pre: any, cur: any) => {
          pre.push({label: cur.subject, value: cur.subjectid, children: cur.gradeList});
          return pre;
        }, []);
        if (!item.children) {
          return;
        }
        item.children.forEach((it: any) => {
          it.children = it.children.reduce((pre: any, cur: any) => {
            pre.push({label: cur.gradename, value: cur.gradeid, children: cur.items});
            return pre;
          }, []);
          if (!it.children) {
            return;
          }
          it.children.forEach((publish: any) => {
            publish.children = publish.children.reduce((pre: any, cur: any) => {
              pre.push({label: cur.name, value: cur.itemid, children: cur.bookList});
              return pre;
            }, []);
            if (!publish.children) {
              return;
            }
            publish.children.forEach((book: any) => {
              book.children = book.children.reduce((pre: any, cur: any) => {
                pre.push({label: cur.tbname, value: cur.bookid});
                return pre;
              }, []);
            });
          });
        });
      });
      await this.setState({book_list});
      this.props.redux_book_list(book_list);
      // this.get_onebook(res.data.bookData.bookid);
    }
  }

  /** 获取并存储当前选择的课本信息 */
  private async get_onebook(bookid: number) {
    const params = {
      bookid: 0,
    };
    params.bookid = bookid;
    const res = await get_onebook(params);
    if (res.code === 200) {
      this.setState({current_book: res.data.tbname});
      const bookinfo = {
        bookname: res.data.tbname,
        bookid,
      };
      console.log('bookinfo:', bookinfo);
      await this.get_child_node(bookid, 'chapter');
      this.setState({tree_data: this.state.current_node});
      this.props.redux_select_book(bookinfo); // 存到redux
      this.props.getCurrentBook(bookid); // 输出到大模块组件当前课本
    }
  }

  /** 获取章节节点 */
  private async get_child_node(id: number, type: string) {
    let res: any = null;
    if (type === 'chapter') {
      res = await get_child_node({bookid: id});
    } else {
      res = await get_child_node({nodeid: id});
    }
    if (res.code === 200) {
      // console.log(res.data)
      const node_list = res.data;
      const tree_data: EDU.NodeDataType[] = [];
      node_list.forEach((item: any) => {
        tree_data.push({title: item.nodename, key: item.nodecode, other_data: item});
      });
      await this.setState({current_node: tree_data});
      this.props.redux_chapter_tree(tree_data);
    }
  }

  /** 选择章节 */
  private onLoadData = async (treeNode: any) => {
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
  private onSelect(selectedKeys: number) {
    this.props.changeNode(selectedKeys);
  }

  /** 章节子节点 */
  private renderTreeNodes = (data: any[] = []) => data.map((item: any) => {
    // console.log(this.props.chapter_tree);
    // console.log(data);
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} dataRef={item} />;
  })
public render() {
  console.log(this.props);
  return (
    <div>
      <p>当前课本：{this.props.current_bookinfo.bookname ? this.props.current_bookinfo.bookname : this.state.current_book}</p>
      <Cascader className='choosebook'
        options={this.props.textbook_list}
        onChange={this.changebook.bind(this)}
        placeholder='更换课本' />
        <Tree loadData={this.onLoadData}
          showLine={true}
          onSelect={this.onSelect.bind(this)}
          >
          {this.renderTreeNodes(this.props.chapter_tree ? this.props.chapter_tree : this.state.tree_data)}
        </Tree>
    </div>
  );
  }
}

const mapStateToProps = (state: any) => ({
  current_bookinfo: state.change_textbook,
  textbook_list: state.textbook_list,
  chapter_tree: state.chapter_tree,
});

const mapDispatchToProps = (dispatch: any) => ({
  redux_select_book: (info: PROPS.CurrentBookinfoType) => dispatch(choose_textbook(info)),
  redux_book_list: (list: PROPS.BookListPropsType[]) => dispatch(save_book_list(list)),
  redux_chapter_tree: (list: string) => dispatch(change_chapter_tree(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTextbook);

