import urlJoin from 'url-join';

import { authPlugin } from 'auth/redux';
import ModelRecord from 'networking/ModelRecord';
import { API_URL } from 'util/constants';


export default class ThreadModel extends ModelRecord({
  id: null,
  username: '',
  first_name: '',
  last_name: '',
}) {
  static urlRoot = urlJoin(API_URL, '/users');
  static auth = authPlugin;

  get fullName() {
    if (this.first_name) {
      return `${this.first_name}${this.last_name ? ` ${this.last_name}` : ''}`;
    }
    return '';
  }

  get displayName() {
    return this.fullName || this.username;
  }
}
