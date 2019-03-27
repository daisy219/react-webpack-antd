import React,{Component} from 'react';
import ReactDOM from 'react-dom';
// import '../webpack.config';
// import './main.scss';
import './src/assets/index.less';
import Button from 'antd/lib/button';
import http from './server';

class App extends Component{
    async test() {
            const res = await http.get('http://10.10.10.115:9002/auth/efficiencyLogin?username=102932001&password=123456&roletype=2')
            console.log(res)
    }
    render(){
        this.test()
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
ReactDOM.render(<App /> , document.getElementById('root'))