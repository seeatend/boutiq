import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from 'ReduxReducers';
import { paginatedFetchMiddleware, updateMiddleware, updateUserMiddleware } from '../middlewares';

const logger = createLogger();
// Initializing with middleware
const createStoreWithMiddleware = applyMiddleware(
  paginatedFetchMiddleware, updateMiddleware, updateUserMiddleware, thunk, logger
);

const finalCreateStore = compose(createStoreWithMiddleware)(createStore);

// Create the store with an initial (empty) state
// In a complex application, we might rehydrate this state from AsyncStorage or etc

export const store = finalCreateStore(rootReducer);
