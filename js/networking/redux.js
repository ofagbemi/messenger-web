import { Map, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';


export const ISSUE_FIND = 'sc/ISSUE_FIND';
export const ISSUE_QUERY = 'sc/ISSUE_QUERY';

export const RECEIVE_FIND = 'sc/RECEIVE_FIND';
export const RECEIVE_QUERY = 'sc/RECEIVE_QUERY';

function mergeEntitiesIntoState(state, Model, results) {
  const obj = {};
  results.forEach(entity => { obj[entity[Model.idField]] = new Model(entity); });

  const entities = state.get('entities');
  const modelEntities = entities.get(Model.urlRoot) || Map();

  return state.merge({
    entities: entities.merge({
      [Model.urlRoot]: modelEntities.merge(obj),
    }),
  });
}

function mergeQueryResultsIntoState(state, action) {
  const { payload: { results }, meta: { url, model: Model } } = action;
  const stateWithEntities = mergeEntitiesIntoState(state, Model, results);
  const resultsState = stateWithEntities.get('results').merge({
    [url]: results.map(entity => entity[Model.idField]),
  });
  return stateWithEntities.merge({ results: resultsState });
}

export default handleActions({
  [RECEIVE_FIND]: {
    next: (state, action) => {
      const { payload, meta: { model: Model } } = action;
      return mergeEntitiesIntoState(state, Model, [payload]);
    },
  },
  [RECEIVE_QUERY]: {
    next: (state, action) => mergeQueryResultsIntoState(state, action),
  },
}, fromJS({
  entities: {},
  results: {},
}));
