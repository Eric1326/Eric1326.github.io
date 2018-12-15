import { getArticleList, getArticle, getTags, getTagArticle } from '@/services/api';

export default {
  namespace: 'articles',
  state: {
    articlelist: {
      list: []
    },
    tagArticle: {
      list: []
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getArticleList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchOne({ payload }, { call, put }) {
      const response = yield call(getArticle, payload);
      yield put({
        type: 'saveArticle',
        payload: response,
      });
    },
    *fetchTags({ payload }, { call, put }) {
      const response = yield call(getTags, payload);
      yield put({
        type: 'saveTags',
        payload: response,
      });
    },
    *fetchTagArticle({ payload }, { call, put }) {
      const response = yield call(getTagArticle, payload);
      yield put({
        type: 'saveTagArticle',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        articlelist: action.payload
      };
    },
    saveArticle(state, action) {
      return {
        ...state,
        article: action.payload
      };
    },
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload
      };
    },
    saveTagArticle(state, action) {
      return {
        ...state,
        tagArticle: action.payload
      };
    },
  },
}