declare namespace EDU {
  /** 获取课本参数类型 */
  export interface TextbookParamsType {
    source: number;
    termid: number;
  }
  /** 只需要传课本id的类型 */
  export interface OnlyBookParamsType {
    bookid: number;
  }
  /** 只需要传班级id的类型 */
  export interface OnlyBookParamsType {
    bookid: number;
  }
  export interface GetChildNodeParamsType {
    bookid?: number;
    nodeid?: number
  }
  /** 获取首页表格的参数类型 */
  export interface GetHomeReportParamsType {
    orderby: number;
    ordertype: number;
    page: number;
    pageline: number;
  }
}