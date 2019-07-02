import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

/** 下拉框组件 */
export function SelectFun(props) {
  const list = props.list;
  if (!list) {
    return null;
  }
  const list_item = list.map((item) =>
    <Option key={item[props.value]}>{item[props.label]}</Option>
  );
  const option_all = props.need_all ? <Option value="-1" key="-1">全选</Option> : '';
  return (
    <Select defaultValue={props.need_all ? '-1': String(props.list[0].value)} style={{ width: 120 }} onChange={props.handleChange}>
      {option_all}
      {list_item}
    </Select>
  )
}