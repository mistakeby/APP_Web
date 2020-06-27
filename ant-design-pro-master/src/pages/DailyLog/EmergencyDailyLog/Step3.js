import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ form }) => ({
 // data: form.step,
}))
class Step3 extends React.PureComponent {
  render() {
    const { data } = this.props;
    const onFinish = () => {
      router.push('/dailylog/emergencysubmit/info');
    };
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          再次上报
        </Button>
      </Fragment>
    );
    return (
      <div align="center">
      <Result
        type="success"
        title="操作成功"
        description="10分钟之内将有人联系您，请保持电话畅通"
        ///extra={information}
        actions={actions}
        className={styles.result}
      />
      </div>
    );
  }
}

export default Step3;
