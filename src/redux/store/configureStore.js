import { createStore, compose, applyMiddleware } from 'redux'
import combineReducers from '../reducers'
import thunk from 'redux-thunk'
import { enableBatching } from 'redux-batched-actions';
// const rootReducer = combineReducers()

// const configureStore = () => createStore(enableBatching(createRootReducer()), initialState, enhancers);

// export default configureStore

export default function configureStore(initialState = {}) {

  const middleware = [thunk]
  const enhancers = compose(
    applyMiddleware(...middleware),
    (window.devToolsExtension && process.env.NODE_ENV !== 'production') ?
      window.devToolsExtension() : f => f
  );
  const store = createStore(enableBatching(combineReducers()), initialState, enhancers);


  return store;
}