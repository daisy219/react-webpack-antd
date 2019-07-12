declare namespace PROPS {
  /** 课本容器组件props类型 */
  export interface TextbookPropsType {
    // wrapClassName: string;
    // show: boolean;
    // title: string;
    changeNode: <T extends {}>() => {};
    getCurrentBook: <T extends {}>() => {};
  }

  // /** 课本章节组件props类型 */
  // export interface BookAndChapterTreePropsType {
  //   changeNode: <T extends {}>(x: number) => {};
  //   getCurrentBook: <T extends {}>(x: number) => {};
  // }
}