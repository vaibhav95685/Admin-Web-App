import { createStore, applyMiddleware, compose } from 'redux';
// import { persistStore, persistReducer} from 'redux-persist'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/index';
const loggerMiddleware = createLogger();

function saveToSessionStorage(state) {
  const serializedState = JSON.stringify(state);
  sessionStorage.setItem('state', serializedState);
}

function loadFromSessionStorage() {
  const serializedState = sessionStorage.getItem('state');
  if (serializedState === null) return undefined;
  return JSON.parse(serializedState);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const presistedState = loadFromSessionStorage();

const store = createStore(
  rootReducer,
  presistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

store.subscribe(() => saveToSessionStorage(store.getState()));
export default store;

// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
// import rootReducer from './reducers/index';
// const loggerMiddleware = createLogger();

// export default createStore(
//     rootReducer,
//     applyMiddleware(thunkMiddleware, loggerMiddleware)
//   );
