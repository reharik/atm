import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../modules/rootReducer';
import DevTools from '../containers/DevTools';
import createSagaMiddleware from 'redux-saga';
import requestSaga from './../sagas/requestSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(sagaMiddleware, createLogger()), DevTools.instrument())
  );

  sagaMiddleware.run(requestSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../modules/rootReducer', () => {
      const nextRootReducer = require('../modules/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
