import React from 'react';
import {Button, Carousel, Modal} from 'antd';

class ShowPics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: this.props.pics ? false : true
    }
  }

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  info = () => {
    Modal.info({
      title: '查看图片',
      width: '800px',
      okText: "关闭",
      content: (
        <Carousel autoplay={false} style={{width: 0, height: 0}}>
          {
            this.props.pics.split(',').map((value, index) => {
              return <div><img style={{with: 300, height: 300}} src={value}/></div>
            })
          }
        </Carousel>


      ),
      onOk() {
      },
    });
  };

  render() {
    return (
      <div>
        <Button disabled={this.state.btnDisabled} onClick={() => {
          this.info()
        }}>查看</Button>
      </div>
    )
  }

}

export default ShowPics;
