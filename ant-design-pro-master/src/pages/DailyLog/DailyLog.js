import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {formatMessage, FormattedMessage} from 'umi/locale';
import {Button, Card, DatePicker, Form, Input, Radio, Select,} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;
const dateFormat = 'YYYY/MM/DD';

{
  /*加载DailyLog目录下models目录下的form.js下的submitDailyLog函数***/
}
@connect(({loading}) => ({
  submitting: loading.effects['form/submitDailyLog'],
}))
@Form.create()
class DailyLog extends PureComponent {//提交表单信息
  handleSubmit = e => {
    const {dispatch, form} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitDailyLog',
          payload: values,
        });
      }
    });
  };
  /*清空页面表单数据的函数*/
  handleResetClick = e => {
    this.props.form.resetFields();
  };

  render() {
    const {submitting} = this.props;
    const {
      form: {getFieldDecorator, getFieldValue},
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };
    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.dailylog.dailylogsubmit.title"/>}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{marginTop: 8}}>

            {/***********上报者ID************/}
            <FormItem {...formItemLayout} label={<FormattedMessage id="dailylog.dailylogsubmit.id"/>}>
              {getFieldDecorator('userid', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({id: 'dailylog.dailylogsubmit.sorry'}),
                  },
                ],
              })
              (<Input placeholder={formatMessage({id: 'dailylog.dailylogsubmit.id.placeholder'})}/>)
              }
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="dailylog.dailylogsubmit.name"/>}>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({id: 'dailylog.dailylogsubmit.sorry'}),
                  },
                ],
              })(<Input placeholder={formatMessage({id: 'dailylog.dailylogsubmit.name.placeholder'})}/>)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="dailylog.dailylogsubmit.time"/>}>
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({id: 'dailylog.dailylogsubmit.sorry'}),
                  },
                ],
              })(
                <DatePicker
                  style={{width: '50%'}}
                  placeholder={""}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="dailylog.dailylogsubmit.content"/>}>
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({id: 'dailylog.dailylogsubmit.sorry'}),
                  },
                ],
              })(
                <TextArea
                  style={{minHeight: 65}}
                  placeholder={formatMessage({id: 'dailylog.dailylogsubmit.content.placeholder'})}
                  rows={6}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="dailylog.dailylogsubmit.emergency"/>}>
              {getFieldDecorator('level', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({id: 'dailylog.dailylogsubmit.sorry'}),
                  },
                ],
              })(
                <Select
                  // placeholder={formatMessage({ id: 'form.emergency.placeholder' })}
                >
                  <Option value="general">一般</Option>
                  <Option value="emergency">紧急</Option>
                  <Option value="critical">危急</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="dailylog.dailylogsubmit.open"/>}
            >
              <div>
                {getFieldDecorator('open', {
                  initialValue: 'true',
                })(
                  <Radio.Group>
                    <Radio value="true">
                      <FormattedMessage id="dailylog.dailylogsubmit.open.open"/>
                    </Radio>
                    <Radio value="false">
                      <FormattedMessage id="dailylog.dailylogsubmit.open.privacy"/>
                    </Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              <div align="center">
                <Button type="primary" htmlType="submit" loading={submitting}>
                  <FormattedMessage id="dailylog.dailylogsubmit.button.submit"/>
                </Button>
                <Button style={{marginLeft: 50}} onClick={this.handleResetClick}>
                  <FormattedMessage id="dailylog.dailylogsubmit.button.reset"/>
                </Button>
              </div>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DailyLog;
