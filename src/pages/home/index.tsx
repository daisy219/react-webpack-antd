/** 主页 */
import React from 'react';
// import { SelectFun } from '@/components/comment_com';
import { welcome_text } from '@/constant/home';
import './index.less';


interface HomeStateType {

}

class Home extends React.Component<any, HomeStateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      welcome_text: '',
    };
  }
  public componentWillMount() {
  }
  public componentDidMount() {
  }
  public render() {
    return (
      <div className='home_model'>
        <div className='welcome_text'>
          <div className='cloud_left'>
            <img src={require('@/assets/image/collected.png')} alt='cloud'/>
          </div>
          {welcome_text}
          <div className='cloud_right'>
            <img src={require('@/assets/image/collected.png')} alt='cloud'/>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
