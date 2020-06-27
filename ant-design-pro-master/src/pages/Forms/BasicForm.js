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


@connect(({loading}) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  handleSubmit = e => {
    console.log("看看");
    const {dispatch, form} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

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
        title={<FormattedMessage id="app.forms.basic.title"/>}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{marginTop: 8}}>


            <FormItem {...formItemLayout} label={<FormattedMessage id="form.title.id"/>}>
              {getFieldDecorator('id', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({id: 'validation.title.required'}),
                  },
                ],
              })(<Input placeholder={formatMessage({id: 'form.title.id.placeholder'})}/>)}
            </FormItem>


            <FormItem {...formItemLayout} label={<FormattedMessage id="form.title.name"/>}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({id: 'validation.title.required'}),
                  },
                ],
              })(<Input placeholder={formatMessage({id: 'form.title.name.placeholder'})}/>)}
            </FormItem>


            <FormItem {...formItemLayout} label={<FormattedMessage id="form.date.label"/>}>
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({id: 'validation.title.required'}),
                  },
                ],
              })(
                <DatePicker
                  style={{width: '50%'}}
                  placeholder={[]}
                />
              )}
            </FormItem>


            <FormItem {...formItemLayout} label={<FormattedMessage id="form.content.label"/>}>
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({id: 'validation.title.required'}),
                  },
                ],
              })(
                <TextArea
                  style={{minHeight: 65}}
                  placeholder={formatMessage({id: 'form.content.placeholder'})}
                  rows={6}
                />
              )}
            </FormItem>


            <FormItem {...formItemLayout} label={<FormattedMessage id="form.emergency.label"/>}>
              {getFieldDecorator('emergency', {
                rules: [{required: true, message: '必填项'}],
              })(
                <Select
                  placeholder={formatMessage({id: 'form.emergency.placeholder'})}
                >
                  <Option value="general">一般</Option>
                  <Option value="emergency">紧急</Option>
                  <Option value="critical">危急</Option>
                </Select>
              )}
            </FormItem>


            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form.public.label"/>}
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">
                      <FormattedMessage id="form.public.radio.public"/>
                    </Radio>
                    <Radio value="2">
                      <FormattedMessage id="form.public.radio.private"/>
                    </Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{marginTop: 32}}>
              <div align="center">
                <Button type="primary" htmlType="submit">
                  <FormattedMessage id="form.submit"/>
                </Button>
                <Button style={{marginLeft: 80}} onClick={this.handleResetClick}>
                  <FormattedMessage id="form.save"/>
                </Button>
              </div>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
