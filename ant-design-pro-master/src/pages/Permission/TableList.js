import React, {Fragment, PureComponent} from 'react';
import {connect} from 'dva';
import {Button, Card, Col, Form, Input, message, Modal, Row, Table,} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TableList.less';

const FormItem = Form.Item;
const CreateForm = Form.create()(props => {
  return (<div></div>);
});

/******弹出窗口主件*******/
@Form.create()
class UpdateForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formVals: {
        name: props.values.name,
        desc: props.values.desc,
        key: props.values.key,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
        inpValu: '',
        // currentPage:1
      },
      currentStep: 0,
    };
    this.formLayout = {
      labelCol: {span: 7},
      wrapperCol: {span: 13},
    };
  }

  render() {
    const {updateModalVisible, handleUpdateModalVisible} = this.props;
    return (
      <Modal
        width={600}
        bodyStyle={{padding: '32px 40px 48px'}}
        destroyOnClose
        title="权限操作"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible()}
        onOk={() => handleUpdateModalVisible()}
      >
        <div align="center">
          <Button type="primary">冻结账户</Button>
          <Button style={{marginLeft: 50}}>删除账户</Button>
          <Button style={{marginLeft: 50}}>解禁账户</Button>
        </div>
      </Modal>
    );
  }
}

/*******加载本目录下的models目录下的PermissionPro******/
@connect(({PermissionPro, loading}) => ({
  PermissionPro,
  loading: loading.models.PermissionPro,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    currentPage: -1
  };
  columns = [
    {
      title: '用户ID',
      dataIndex: 'userid',
    },
    {
      title: '用户权限',
      dataIndex: 'authority',

    },
    {
      title: '账号状态',
      dataIndex: 'status',

    },
    {
      title: '上次登录时间',
      dataIndex: 'last',

    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>操作</a>
        </Fragment>
      ),
    },
  ];

  //重置按钮，清空input框数据
  handleFormReset = () => {
    const {form} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  };

  /*********第一次渲染之后调用*******/
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'PermissionPro/fetchBasic',//调用proflie下的fetchBasic函数
      payload: "1"
    });
  }

  bindInput = (e) => {
    this.setState({
      inpValu: e.target.value
    })
  };
  //查询按钮
  handleSearch = e => {
    e.preventDefault();
    const {dispatch, form} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

//将UpdateForm隐藏
  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  getInputValue = () => {
    console.log(this.state.inpValu);
    const {dispatch} = this.props;
    dispatch({
      type: 'PermissionPro/SearchByid',//fetchBasic',//调用proflie下的fetchBasic函数
      payload: this.state.inpValu
    });
  };

  handleUpdate = fields => {
    const {dispatch} = this.props;
    dispatch({
      type: 'rule/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    });
    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  renderForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="查询用户ID">
              {getFieldDecorator('name')(<Input id="id1" placeholder="请输入"
                                                onChange={this.bindInput.bind(this)}></Input>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit" onClick={this.getInputValue}>
                查询
              </Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  render() {
    const {
      loading,
      PermissionPro,
    } = this.props;
    const {selectedRows, modalVisible, updateModalVisible, stepFormValues} = this.state;
    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
            </div>
          </div>
          <div>
            <Table
              style={{marginBottom: 5}}
              //pagination={true}
              loading={loading}
              dataSource={PermissionPro.as}
              columns={this.columns}
              // onChange={this.PaginationChange}
              pagination={{
                // 设置总条数
                total: 100,
                pageSize: 5,
                onChange: ((page) => {
                  this.setState({
                    currentPage: page
                  }, () => {
                    const {dispatch} = this.props;
                    dispatch({
                      type: 'PermissionPro/fetchBasic',//调用proflie下的fetchBasic函数
                      payload: this.state.currentPage
                    });
                  })
                }),
              }}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible}/>
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }

}

export default TableList;
