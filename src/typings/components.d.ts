declare namespace PROPS {
  /** 基础弹框props类型 */
  export interface BaseDialogPropsType {
    wrapClassName: string;
    show: boolean;
    title: string;
    handleOk: <T extends {}>() => {};
    handleCancel: <T extends {}>() => {};
  }

  /** 课本章节组件props类型 */
  export interface BookAndChapterTreePropsType {
    bookid: number;
    nodeid: number;
    changeNode: <T extends {}>(x: number) => {};
    getCurrentBook: <T extends {}>(x: number) => {};
  }
}