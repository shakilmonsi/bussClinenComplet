import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import busLists from "./reducers/busReducer";

const middleware = applyMiddleware(thunk);

const combinedReducer = combineReducers({
  busLists,
});

export const store = createStore(
  combinedReducer,
  composeWithDevTools(middleware)
);
