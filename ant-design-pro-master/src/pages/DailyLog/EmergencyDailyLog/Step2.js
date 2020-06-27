import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider } from 'antd';
import router from 'umi/router';
import { digitUppercase } from '@/utils/utils';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))
@Form.create()
class Step2 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/dailylog/emergencysubmit/info');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    return (
      <div align="center">
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="上报信息一经提交将无法撤回，请审慎检查日志内容"
          style={{ marginBottom: 24 }}
        />
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="上报人姓名">
          {data.id}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="联系方式">
          {data.phonenumber}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="上报内容">
          {data.content}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="上报级别">
          {data.level}
        </Form.Item>

        <Divider style={{ margin: '24px 0' }} />

        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <div align="center">
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 20 }}>
            上一步
          </Button>
          </div>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

export default Step2;
