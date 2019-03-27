import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button';

class Home extends Component{
  async test() {
      // const res = await http.get(api_address + '/auth/efficiencyLogin?username=102932001&password=123456&roletype=2')
      // console.log(res)
  }
  render(){
      // this.test()
      return (
          <div className="fff">111
              <Button type="primary">Button</Button>
              <Button>Default</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="danger">Danger</Button>
          </div>
      )
  }
}
export default Home