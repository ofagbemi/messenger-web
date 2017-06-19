import equal from 'deep-equal';
import { mapObjIndexed } from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const connectFetchFunctions = config => {
  const mapStateToProps = (state, props) => (
    mapObjIndexed(
      ({ getParams }) => (
        getParams ? getParams(state, props) : {}
      ),
      config
    )
  );

  const actionCreators = mapObjIndexed(modelConfig => {
    const { type, model: Model } = modelConfig;
    switch (type) {
      case 'query':
        return Model.issueQuery.bind(Model);
      default:
        return Model.issueFind.bind(Model);
    }
  }, config);
  const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

  const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    networkingParams: stateProps,
    networkingFns: mapObjIndexed(
      (fn, key) => () => fn(stateProps[key]),
      dispatchProps
    ),
    ...ownProps,
  });

  return connect(mapStateToProps, mapDispatchToProps, mergeProps);
};

const connectModels = config => {
  const mapStateToProps = (state, props) => (
    mapObjIndexed(
      modelConfig => {
        const { type, getParams, model: Model } = modelConfig;
        const params = getParams ? getParams(state, props) : {};
        switch (type) {
          case 'query':
            return Model.querySelector(state, params);
          default:
            return Model.findSelector(state, params);
        }
      },
      config
    )
  );
  return connect(mapStateToProps);
};

export default config => WrappedComponent => {
  const props = Object.keys(config);
  @connectModels(config)
  @connectFetchFunctions(config)
  class ConnectedComponent extends React.PureComponent {
    componentDidMount() {
      this.update(null);
    }

    componentWillReceiveProps(nextProps) {
      this.update(nextProps);
    }

    update(nextProps) {
      if (nextProps === null) {
        const { networkingParams, networkingFns } = this.props;
        Object.keys(networkingParams).map(prop => {
          networkingFns[prop]();
        });
        return;
      }

      const { networkingParams } = this.props;
      const { networkingParams: nextNetworkingParams, networkingFns } = nextProps;
      Object.keys(networkingParams).map(prop => {
        if (!equal(networkingParams[prop], nextNetworkingParams[prop])) {
          networkingFns[prop]();
        }
        return undefined;
      });
      // const { networking } = this.props;
      // Object.keys(networking).forEach(key => {
      //   networking[key]();
      // });
    }

    get isLoaded() {
      return props.find(prop => !this.props[prop]) === undefined;
    }

    render() {
      if (this.isLoaded) {
        return <WrappedComponent {...this.props} />;
      }
      return <span>Loading</span>;
    }
  }
  return ConnectedComponent;
};
