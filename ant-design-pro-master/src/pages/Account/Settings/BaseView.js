import React, {Component, Fragment} from 'react';
import {formatMessage, FormattedMessage} from 'umi/locale';
import {Button, Form, Input, Select, Upload} from 'antd';
import {connect} from 'dva';
import styles from './BaseView.less';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';

const FormItem = Form.Item;
const {Option} = Select;

const props = {
  name: 'file',
  action: '/AM/personalinformation/icon',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    /* if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }*/
  },
};
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({avatar}) => (
  <Fragment>
    <div className={styles.avatar_title}>
      <FormattedMessage id="account.settings.avatar"/>
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar"/>
    </div>
    <Upload {...props}>
      <Button icon="upload" style={{marginLeft: 20}}>
        <FormattedMessage id="account.settings.change-avatar"/>
      </Button>
    </Upload>
  </Fragment>
);

@connect(({user}) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class BaseView extends Component {
  componentDidMount() {
  }

  getAvatarURL() {
    /* const {currentUser} = this.props;
     if (currentUser.avatar) {
       return currentUser.avatar;
     }
     {/!*******如果用户没有上传过头像的话，就显示这个作为头像*****!/
     }*/
    const url = 'http://localhost:5088/icon/zzn/icon.jpg';//https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  getViewDom = ref => {
    this.view = ref;
  };

  render() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem label={formatMessage({id: 'account.setting.email'})}>
              {getFieldDecorator('account_email', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input/>)}
            </FormItem>

            <FormItem label={formatMessage({id: 'account.setting.name'})}>
              {getFieldDecorator('account_name', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input/>)}
            </FormItem>
            <FormItem label={formatMessage({id: 'account.setting.country'})}>
              {getFieldDecorator('account_country', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Select style={{maxWidth: 220}}>
                  <Option value="China">中国</Option>
                  <Option value="China">美国</Option>
                  <Option value="China">英国</Option>
                  <Option value="China">其他</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label={formatMessage({id: 'account.setting.geographic'})}>
              {getFieldDecorator('account_geographic', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<GeographicView/>)}
            </FormItem>
            <FormItem label={formatMessage({id: 'account.setting.phone'})}>
              {getFieldDecorator('account_phone', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<PhoneView/>)}
            </FormItem>
            <div align="center">
              <Button type="primary">
                <FormattedMessage
                  id="account.setting.button"
                />
              </Button>
            </div>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()}/>
        </div>
      </div>
    );
  }
}

export default BaseView;
