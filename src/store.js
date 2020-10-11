import { createStore, compose } from 'redux';
import rootReducer from './reducer';

// allows us to see the redux store with the redux devtool
const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const composeEnhancers = compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(),
);

