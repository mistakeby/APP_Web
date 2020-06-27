import React, {Fragment, PureComponent} from 'react';
import {Card, Steps} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../style.less';

const {Step} = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    console.log("index");
    const {location} = this.props;
    const {pathname} = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const {location, children} = this.props;
    return (
      <PageHeaderWrapper
        title="紧急事态上报"
        tabActiveKey={location.pathname}

      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="填写上报信息"/>
              <Step title="确认相关信息"/>
              <Step title="完成"/>
            </Steps>
            {children}
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
