import React from 'react';
import {Button, Carousel, Modal} from 'antd';

class ShowVideos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: this.props.pics ? false : true
    }
  }

  info = () => {
    Modal.info({
      title: '查看视频',
      width: '800px',
      okText: "关闭",
      content: (
        <Carousel autoplay={false} style={{width: 0, height: 0}}>
          {
            this.props.pics.split(',').map((value, index) => {
              return <div>
                <video style={{with: 300, height: 600}} src={value} controls autoplay/>
              </div>
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

export default ShowVideos;
