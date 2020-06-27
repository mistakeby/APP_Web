import React, {Fragment} from 'react';
import {Icon, Layout} from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const {Footer} = Layout;
const FooterView = () => (
  <Footer style={{padding: 0}}>
    <GlobalFooter
      links={[
        {
          key: '503项目',
          title: '503项目',
          //href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {

          key: 'github',
          title: <Icon type="shake"/>,
          // href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'APP端数据管理中心',
          title: 'APP端数据管理中心',
          //href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright"/> 2020 张泽宁 武汉大学 实验室项目测试版本
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
