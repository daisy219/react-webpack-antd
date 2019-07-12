declare namespace PROPS {
  /** 课本容器组件props类型 */
  export interface TextbookPropsType {
    textbook_list: any;
    chapter_tree: [];
    current_bookinfo: PROPS.CurrentBookinfoType,
    // title: string;
    changeNode: <T extends {}>(x: number) => {};
    getCurrentBook: <T extends {}>(x: number) => {};
    redux_book_list: <T extends {}>(x: Object) => {};
    redux_select_book: <T extends {}>(x: PROPS.CurrentBookinfoType) => {};
    redux_chapter_tree: <T extends {}>(x: EDU.NodeDataType[]) => {};
  }
  export interface CurrentBookinfoType {
    bookid: number;
    bookname: string;
  }

  // /** 课本章节组件props类型 */
  // export interface BookAndChapterTreePropsType {
  //   changeNode: <T extends {}>(x: number) => {};
  //   getCurrentBook: <T extends {}>(x: number) => {};
  // }
}