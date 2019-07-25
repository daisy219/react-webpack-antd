declare namespace EDU {
    // 下拉框基础类型
    export interface SelectValueType {
      value: number | string;
      label: string;
    }
    export interface NodeDataType {
      title: string;
      key: number;
      other_data: any;
    }
    export interface StudentList {
      name: string;
      id: number;
    }
}