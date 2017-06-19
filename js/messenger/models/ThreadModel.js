import urlJoin from 'url-join';
import { List } from 'immutable';

import { authPlugin } from 'auth/redux';
import ModelRecord from 'networking/ModelRecord';
import { API_URL } from 'util/constants';


export default class ThreadModel extends ModelRecord({
  id: null,
  members: List(),
}, 'ThreadModel') {
  static urlRoot = urlJoin(API_URL, '/threads');
  static auth = authPlugin;

  constructor(data = {}) {
    super({ ...data, members: List(data.members) });
  }
}
