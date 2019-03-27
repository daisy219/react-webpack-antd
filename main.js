import React,{Component} from 'react';
import ReactDOM from 'react-dom';
// import '../webpack.config';
// import './main.scss';
import './src/assets/index.less';
import http from './src/services';
import Home from './src/pages/home/index'

var api_address = 'http://10.10.10.115:9002';
class App extends Component{
    async test() {
        var res = await http.get(api_address + '/auth/efficiencyLogin?username=102932001&password=123456&roletype=2')
        console.log(res)
    }
    render(){
        this.test()
        return (
            <Home/>
        )
    }
}
ReactDOM.render(<App /> , document.getElementById('root'))