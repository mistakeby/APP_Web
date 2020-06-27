import {routerRedux} from 'dva/router';
import {message} from 'antd';
import {fakeSubmitForm} from '@/services/api';
import {DailylogSubmit} from "../../../services/api";

export default {
  namespace: 'form',

  state: {
    step: {
      id: 'null',
      phonenumber: 'null',
      content: 'null',
      level: 'null',
    },
  },

  effects: {
    * submitDailyLog({payload}, {call}) {
      yield call(DailylogSubmit, payload);
      message.success('提交成功');
    },
    * submitStepForm({payload}, {call, put}) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/dailylog/emergencysubmit/result'));
    },
  },

  reducers: {
    saveStepFormData(state, {payload}) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
