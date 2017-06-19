import urlJoin from 'url-join';

import { authPlugin } from 'auth/redux';
import ModelRecord from 'networking/ModelRecord';
import { API_URL } from 'util/constants';


export default class MessageModel extends ModelRecord({
  id: null,
  thread_id: null,
}) {
  static urlRoot = urlJoin(API_URL, '/messages');
  static auth = authPlugin;
}
