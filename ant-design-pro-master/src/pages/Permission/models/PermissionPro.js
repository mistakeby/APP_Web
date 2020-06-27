import {queryAdvancedProfile} from '@/services/api';
import {AuthorityPage, AuthorityPage_All} from "../../../services/api";

export default {
  namespace: 'PermissionPro',
  state: {
    basicGoods1: [],
    s: 10,
  },

  effects: {
    * fetchBasic({payload}, {call, put}) {
      const response = yield call(AuthorityPage_All, payload);//AuthorityPage);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    * SearchByid({payload}, {call, put}) {
      const response = yield call(AuthorityPage, payload);//AuthorityPage);
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
