import React from 'react';
import { connect } from 'react-redux'
// import { Icon, Menu, Divider} from 'antd';
import { Button } from 'antd';
import { add_num, reduce_num } from '../action/index'
// class NumDisplay extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   // this.method = this.method.bind(this);
//   }
// // METHODS
// render(){
//   return (
//     <div>
//        <Button onClick={ () => {
//          add_num()
//         }}>加1</Button>
//        <Button>减1</Button>
//        {this.props.add_num}
//      </div>
//    )
//   }
// }
const NumDisplay =({ final_num, visibilityFilter, add_num, reduce_num }) => {
  console.log(final_num)
  console.log(add_num)
  return (
      <div>
       <Button onClick={ () => {
        //  console.log(add_num(final_num))
         add_num()
        }}>加1</Button>
       <Button onClick={ () => {
         reduce_num()
       }}>减1</Button>
       {final_num}{visibilityFilter}
     </div>
  )
}
const mapStateToProps = state => ({
  final_num: state.change_num,
  visibilityFilter: state.visibilityFilter
})
// const mapDispatchToProps = dispatch => ({
//   add_num: () => dispatch({type: 'ADD'}),
//   reduce_num: () => dispatch({type: 'REDUCE'})
// })
const mapDispatchToProps = {
  add_num,reduce_num
}
export default connect(mapStateToProps, mapDispatchToProps)(NumDisplay)