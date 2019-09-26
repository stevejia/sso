// import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from "redux";
import spinReducer from "./reducers/spin";
const reducers = combineReducers({
  spin: spinReducer
});

const store = createStore(reducers);
// serviceWorker.unregister();
export default store;
