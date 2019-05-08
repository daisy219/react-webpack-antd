import React from 'react';
import './index.less';
import { Cascader, Row, Col, Button } from 'antd';
import ChooseTextbook from '../../components/choose_textbook';

class Coach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentWillMount() {
    // this.get_textbooks();
  }


  /** 新建作业辅导 */
  newCoach() {

  }
  render() {
    return (
      <div className="coach_model">
        <Row>
          <Col span={6}>
            <ChooseTextbook />
          </Col>
          <Col span={18}>
            <div className="coach_model_content">
              <div className="btn_group">
                <Button type="primary" onClick={this.newCoach.bind(this)}>新建</Button>
                <Button type="primary" onClick={this.newCoach.bind(this)}>导出</Button>
                <Button type="danger" onClick={this.newCoach.bind(this)}>删除</Button>
              </div>
            </div>
          </Col>

        </Row>
      </div>
    )
  }
}
export default Coach