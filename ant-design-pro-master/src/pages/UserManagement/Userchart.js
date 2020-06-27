import React, {Component} from 'react';
import {connect} from 'dva';
import {FormattedMessage} from 'umi/locale';
import {Card, Col, Row, Tabs,} from 'antd';
import {Bar, ChartCard, Field, MiniArea, MiniBar,} from '@/components/Charts';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import {getTimeDistance} from '@/utils/utils';
import styles from './Userchart.less';

const {TabPane} = Tabs;


@connect(({chart, loading}) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Userchart extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    loading: true,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
      this.timeoutId = setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 600);
    });
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };


  render() {
    const {salesType, loading: propsLoding, currentTabKey} = this.state;
    const {chart, loading: stateLoading} = this.props;
    const {
      visitData,
      salesData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;
    const loading = propsLoding || stateLoading;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: {marginBottom: 24},
    };

    return (

      <GridContent>
        <Card bordered={false}>
          <Row gutter={50}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title={
                  <FormattedMessage id="usermanagement.usernumber_allday"/>
                }
                loading={loading}
                total={() => <h1>300</h1>}
                footer={
                  <Field
                    label={
                      <FormattedMessage id="usermanagement.usernumber_isactivity"/>
                    }
                    value={'202'}
                  />
                }
                contentHeight={46}
              >
                <MiniBar color="#F7F709" data={visitData}/>
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                loading={loading}
                title={<FormattedMessage id="usermanagement.usernumber_all"/>}
                total={numeral(8846).format('0,0')}
                footer={
                  <Field
                    label={
                      <FormattedMessage id="usermanagement.usernumber_month_activity"/>
                    }
                    value={numeral(1234).format('0,0')}
                  />
                }
                contentHeight={46}
              >
                <MiniArea color="#F7F709" data={visitData}/>
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                loading={loading}
                title={<FormattedMessage id="usermanagement.info_all"/>}
                total={numeral(8846).format('0,0')}
                footer={
                  <Field
                  />
                }
                contentHeight={46}
              >
                <MiniArea color="#F7F709" data={visitData}/>
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                loading={loading}
                title={<FormattedMessage id="usermanagement.info_day"/>}
                total={numeral(8846).format('0,0')}
                footer={
                  <Field

                  />
                }
                contentHeight={46}
              >
                <MiniArea color="#F7F709" data={visitData}/>
              </ChartCard>
            </Col>
          </Row>
        </Card>

        <Card loading={loading} bordered={false} bodyStyle={{padding: 0}}>
          <div className={styles.salesCard}>
            <Tabs size="large" tabBarStyle={{marginBottom: 24}}>
              <TabPane
                tab={<FormattedMessage id="usermanagemnt.info.year.trend"/>}
                key="info.year.trend"
              >
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar
                        height={295}
                        title={
                          <FormattedMessage
                            id="usermanagement.info.year.trend.1"
                          />
                        }
                        data={salesData}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>

                  </Col>
                </Row>
              </TabPane>
              <TabPane
                tab={<FormattedMessage id="usermanagement.info.day.trend" defaultMessage="Visits"/>}
                key="info.day.trend"
              >
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar
                        height={292}
                        title={
                          <FormattedMessage
                            id="usermanagement.info.day.trend.1"
                          />
                        }
                        data={salesData}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </GridContent>
    );
  }
}

export default Userchart;
