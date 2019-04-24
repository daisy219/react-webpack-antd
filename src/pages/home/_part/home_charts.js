/**
* 首页图表
*/
import React from 'react';
import echarts from 'echarts';
import './home_charts.less';
// import { Icon, Menu, Divider} from 'antd';

class HomeEcharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  // this.method = this.method.bind(this);
  }
  componentWillMount() {

  }
  componentDidMount() {
    const myChart = echarts.init(document.getElementById('home_charts'));

    // 指定图表的配置项和数据
    const option = {
      legend: {},
      tooltip: {},
      dataset: {
          source: [
              ['product', '2015', '2016', '2017'],
              ['Matcha Latte', 43.3, 85.8, 93.7],
              ['Milk Tea', 83.1, 73.4, 55.1],
              ['Cheese Cocoa', 86.4, 65.2, 82.5],
              ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
      ]
    };
  

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
// METHODS

  render(){
   return (
     <div id="home_charts">
       图表
     </div>
   )
  }
}
export default HomeEcharts