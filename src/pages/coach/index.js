import React from 'react';
// import MainMenu from '../../components/menu'

// class Coach extends React.Component {
//   render({ match }) {
//     return (
//       <div>
//         {match.params.number}
//         作业辅导页面
//       </div>
//     )
//   }
// }
function Coach({match}) {
  return(
    <div>
      {/* <MainMenu/> */}
      {match.params.number}
    </div>
  )
}
export default Coach