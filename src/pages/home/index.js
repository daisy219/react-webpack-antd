import React from 'react';
import { Cascader } from 'antd';
import { get_textbooks } from '../../services/home'
import './index.less'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           options: [{
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [{
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [{
                    value: 'xihu',
                    label: 'West Lake',
                  }],
                }],
              }, {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [{
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [{
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  }],
                }],
              }]
        }
    }
    componentWillMount() {
        this.get_textbooks()
    }
    async get_textbooks () {
        get_textbooks({source: 1, termid: window.localStorage.getItem("termid"), roletype: 1}).then((data) => {
            if (data.data.code===200) {
                console.log(data.data)
            }
            // 用户名   10293210666
          })
    }
    onChange(value) {
        console.log(value);
    }

    render(){   
        // this.test()
        return (
            <div className="home_model">
                {/* <MainMenu currentPage='home'/> */}
                <span className="label">请选择课本</span>
                <Cascader options={this.state.options} onChange={this.onChange.bind(this)} placeholder="请选择课本" />
                {/* <img src={require('../../assets/image/bg.jpg')}></img> */}
            </div>
        )
  }
}
export default Home