declare namespace EDU {
  /**
   * 返回数据
   *
   * @export
   * @interface AjaxResponseType
   */
  export interface AjaxResponseType {
    readonly code: number;   // 状态码
    readonly msg: string;    // 信息
    readonly token?: string; // token
    readonly data: any;      // 具体数据
  }

  /**
   * 返回数据的 page 数据
   *
   * @export
   * @interface ResponsePageType
   */
  export interface ResponsePageType {
    cur: number;   // 当前页
    line: number;  // 每页条数
    total: number; // 总数
  }

  /**
   * 状态返回的数据
   *
   * @export
   * @interface ResponseStatusType
   */
  export interface ResponseStatusType {
    status: boolean;
    message: string;
  }

  /**
   * 状态返回的数据 (会携带数据)
   *
   * @export
   * @interface ResponseStatusAndDataType
   */
  export interface ResponseStatusAndDataType<T> {
    status: boolean;
    message: string;
    data: T;
  }

  /**
   * get 请求参数
   *
   * @export
   * @interface GetConfigType
   */
  export interface GetConfigType {
    api: string;
    params?: any;
  }

  /**
   * post 请求参数
   *
   * @export
   * @interface PostConfigType
   */
  export interface PostConfigType {
    api: string;
    data?: any;
    format?: string;
  }
}
