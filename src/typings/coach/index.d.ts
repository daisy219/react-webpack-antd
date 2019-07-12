declare namespace EDU {
  /** 获取作业辅导列表参数 */
  export interface GetCoachListParamsType {
    page: number;
    pageline: number;
    nodecode?: number;
    bookId?: number;
  }

  /** 新建作业辅导传参 */
  export interface NewCoachParamsType {
    bookid: number;
    shared: number;
    name: string;
  }
}