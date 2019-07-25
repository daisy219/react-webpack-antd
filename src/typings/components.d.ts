declare namespace PROPS {
  /** 基础弹框props类型 */
  export interface BaseDialogPropsType {
    wrapClassName: string;
    show: boolean;
    title: string;
    handleOk: <T extends {}>() => {};
    handleCancel: <T extends {}>() => {};
  }
  /** 选择课本组件props类型 */
  export interface BookListPropsType {
    label: string;
    value: string | undefined;
    children?: PROPS.BookListPropsType[];
  }
  /** 课本章节组件props类型 */
  export interface BookAndChapterTreePropsType {
    bookid: number;
    nodeid: number;
    changeNode: <T extends {}>(x: number) => {};
    getCurrentBook: <T extends {}>(x: number) => {};
  }

  /** 下拉框组件props类型 */
  export interface SelectFunPropsType {
    list: EDU.SelectValueType[];
    value: number;
    label: string;
    need_all: boolean;
    handleChange: <T extends {}>() => {};
  }

  /** TodoListprops类型 */
  export interface TodoListPropsType {
    todos: any[];
    toggleTodo: <T extends {}>(x: number) => {};
  }

  /** 学生选择props类型 */
  export interface StudentListPropsType {
    classid: number;
    options: any[];
    stu_show: boolean;
    stu_list: any[];
    checkedList: number[];
    checked_stu_list: any[];
    changeStuCheck: <T extends {}>(x: number, y: number) => {};
  }

  /** 班级选择props类型 */
  export interface ClassCheckboxPropsType {
    list: any[];
    change_class_check: <T extends {}>() => {};
    changeStuCheck: <T extends {}>(x: number) => {};
    changeList: <T extends {}>(x: any, y?: any) => {};
  }

  /** 新建作业辅导组件props类型 */
  export interface NewCoachPropsType {
    class_list: any[];
    bookid: number;
    changeList: <T extends {}>(x: any, y?: any) => {};
    show_add_dialog: boolean;
    submit: <T extends {}>() => {};
    handleCancel: <T extends {}>() => {};
    changeStuCheck: <T extends {}>() => {};
    change_class_check: <T extends {}>() => {};
  }

  /** 导航组件props类型 */
  export interface MenuPropsType {

  }
}