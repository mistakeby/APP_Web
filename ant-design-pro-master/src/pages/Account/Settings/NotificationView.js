import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Card, Col, Row} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Center.less';

@connect(({loading, user, project}) => ({
  listLoading: loading.effects['list/fetch'],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  project,
  projectLoading: loading.effects['project/fetchNotice'],
}))
class NotificationView extends PureComponent {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
    dispatch({
      type: 'project/fetchNotice',
    });
  }

  render() {
    const {newTags, inputVisible, inputValue} = this.state;
    const {
      listLoading,
      currentUser,
      currentUserLoading,
      project: {notice},
    } = this.props;

    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{marginBottom: 24}} loading={currentUserLoading}>
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatar}/>
                  <div className={styles.name}>{currentUser.name}</div>
                </div>
                <div className={styles.avatarHolder}>
                  <div>{"用户id: " + currentUser.userid}</div>
                  <p>
                  </p>
                  <div>
                    {"用户权限：" + currentUser.permission}
                  </div>
                  <p>
                  </p>
                  <div>
                    {"用户邮箱：" + currentUser.email}
                  </div>
                  <p>
                  </p>
                  <div>
                    {"联系电话：" + currentUser.userphone}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default NotificationView;
