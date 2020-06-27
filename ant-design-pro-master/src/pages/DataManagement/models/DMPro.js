import {queryAdvancedProfile} from '@/services/api';
import {DataSelect_ALL, DataSelectByid} from "../../../services/api";

export default {
  namespace: 'DMPro',
  state: {
    basicGoods: [],
    s: 10,
  },

  effects: {
    * fetchBasic({payload}, {call, put}) {
      const response = yield call(DataSelect_ALL, payload);//AuthorityPage);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    * SearchByid({payload}, {call, put}) {
      const response = yield call(DataSelectByid, payload);//AuthorityPage);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    * fetchAdvanced(_, {call, put}) {
      const response = yield call(queryAdvancedProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },

  },
};
