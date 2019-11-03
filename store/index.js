import {createStore , applyMiddleware,compose}from 'redux'
import createSagaMiddleware from 'redux-saga'
import sessionReducer from './reducers/sessionReducer'
import reactotron from '../ReactotronConfigs';
import sessionSaga from './sagas/SessionSaga'
const sagaMiddleware = createSagaMiddleware()
  
if (__DEV__) {
  import('../ReactotronConfigs').then(() =>
    console.log('Reactotron Configured'),
  );
}
  const store = createStore(
    sessionReducer,
    compose(
    reactotron.createEnhancer(),
    applyMiddleware(sagaMiddleware)
    )
    );
    sagaMiddleware.run(sessionSaga)


export default store