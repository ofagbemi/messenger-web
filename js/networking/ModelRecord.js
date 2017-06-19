import qs from 'qs';
import urlJoin from 'url-join';
import { identity } from 'ramda';
import { Record } from 'immutable';

import { alphabeticalSort } from 'util/index';

import { ISSUE_FIND, RECEIVE_FIND, ISSUE_QUERY, RECEIVE_QUERY } from './redux';


const promisifyAction = action => {
  const meta = { ...action.meta };
  meta.promise = new Promise((resolve, reject) => {
    meta.resolve = resolve;
    meta.reject = reject;
  });
  return { ...action, meta };
};

export default function ModelRecord(defaults) {
  return class extends Record(defaults) {
    static idField = 'id';
    static auth = identity;

    static findSelector(state, params) {
      return state.getIn([
        'networking',
        'entities',
        this.urlRoot,
        params[this.idField],
      ]);
    }

    static querySelector(state, params) {
      const queryUrl = this.queryUrl(params);
      const ids = state.getIn([
        'networking',
        'results',
        queryUrl,
      ]);

      return ids
        ? ids.map(id => this.findSelector(state, { [this.idField]: id }))
        : undefined;
    }

    static findUrl(params) {
      const id = params[this.idField];
      return urlJoin(this.urlRoot, id);
    }

    static queryUrl(params) {
      return urlJoin(
        this.urlRoot,
        `?${qs.stringify(params, { sort: alphabeticalSort })}`
      );
    }

    static issueFind(payload) {
      return promisifyAction({
        type: ISSUE_FIND,
        meta: {
          model: this,
          url: this.findUrl(payload),
          receiveFn: this.receiveFind.bind(this),
        },
        payload,
      });
    }

    static issueQuery(payload) {
      return promisifyAction({
        type: ISSUE_QUERY,
        meta: {
          model: this,
          url: this.queryUrl(payload),
          receiveFn: this.receiveQuery.bind(this),
        },
        payload,
      });
    }

    static receiveFind(payload, fetchAction) {
      return {
        type: RECEIVE_FIND,
        meta: { model: this, url: fetchAction.meta.url },
        payload,
        error: payload instanceof Error,
      };
    }

    static receiveQuery(payload, fetchAction) {
      return {
        type: RECEIVE_QUERY,
        meta: { model: this, url: fetchAction.meta.url },
        payload,
        error: payload instanceof Error,
      };
    }
  };
}
