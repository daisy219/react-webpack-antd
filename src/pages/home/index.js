import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';


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
            <ul>
                <li><Link to='/home' >Home</Link></li>
                <li><Link to='/coach/6'>coach</Link></li>
                <li><Link to='/worry'>worry</Link></li>
                <li><Link to='/work'>work</Link></li>
            </ul>
          </div>
      )
  }
}
export default Home