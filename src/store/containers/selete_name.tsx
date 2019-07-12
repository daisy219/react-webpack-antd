import React from 'react';

import { connect } from 'react-redux';
import { select_name } from '../action/index';
// import Wrong from '../../pages/wrong/index';
// import TodoList from '../../components/TodoList';
// import { Button } from 'antd';
// import { add_num, reduce_num } from '../action/index';
import { SelectFun } from '../../components/comment_com';

class Seletename extends React.Component<PROPS.SelectNamePropsType, {}> {
  constructor(props: any) {
    super(props);
  }
  public componentWillMount() {
    this.props.select_name(this.props.name_list[0].value);
    this.props.changename(this.props.name_list[0].value);
  }
  private changeName(value: string) {
    // console.log(value);
    this.props.select_name(value);
    this.props.changename(value);
  }
  // console.log(add_num)
  public render() {
    // console.log(this.props)
    return (
      <div>{this.props.current_select}
        {/* <Button onClick={ () => {
        //  console.log(add_num(final_num))
        this.props.add_num()
        }}>加1</Button>
        <Button onClick={ () => {
          this.props.reduce_num()
        }}>减1</Button>
        {this.props.final_num}{this.props.visibilityFilter} */}
        <SelectFun list={this.props.name_list} label={'label'} value={'value'}
        handleChange={this.changeName.bind(this)}/>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  current_select: state.select_name,
  // final_num: state.change_num,
});

const mapDispatchToProps = (dispatch: any) => ({
  select_name: (value: string) => dispatch(select_name(value)),
  // add_num,reduce_num
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Seletename);
