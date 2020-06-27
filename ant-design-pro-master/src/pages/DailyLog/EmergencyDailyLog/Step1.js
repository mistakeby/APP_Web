import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ form }) => ({
  data: form.step,
}))
@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          router.push('/dailylog/emergencysubmit/confirm');
        }
      });
    };
    return (
      <Fragment>
        <div align="center">
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="上报人姓名">
            {getFieldDecorator('id', {
              rules: [
                {
                  required: true,
                  message:  '抱歉，此为必填选项',
                },
              ],
            })
            (<Input />)
            }
          </Form.Item>

          <Form.Item {...formItemLayout} label="联系方式">
            <Input.Group compact>
              <Select defaultValue="mobilephone" style={{ width: 100 }}>
                <Option value="mobilephone">移动电话</Option>
                <Option value="telephone">固定电话</Option>
              </Select>
              {getFieldDecorator('phonenumber', {
                rules: [
                  { required: true,
                    message:  '抱歉，此为必填选项',
                  },
                ],
              })(<Input style={{ width: 'calc(100% - 100px)' }} />)}
            </Input.Group>
          </Form.Item>

          <Form.Item {...formItemLayout} label="上报内容">
            {getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message:  '抱歉，此为必填选项',
                },
              ],
            })
            (<textarea
              style={{ width: 'calc(100% - 0px)' }}
              rows={3}/>)
            }
          </Form.Item>

          <Form.Item {...formItemLayout} label="上报级别">
            {getFieldDecorator('level', {
              rules: [
                {
                  required: true,
                  message:  '抱歉，此为必填选项',
                },
              ],
            })
            ( <Select defaultValue="city" >
              <Option value="市级">市级</Option>
              <Option value="省级">省级</Option>
              <Option value="国家级">国家级</Option>
            </Select>)
            }
          </Form.Item>

          <Form.Item
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
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
            </div>
          </Form.Item>
        </Form>
        </div>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>

        </div>
      </Fragment>
    );
  }
}

export default Step1;
