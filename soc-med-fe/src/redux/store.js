import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// Reducers
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});

// Enable store to work without DevTools. Creates its own tools during production stage
// eslint-disable-next-line no-underscore-dangle
let devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "production") {
  devTools = a => a;
}

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    devTools
  )
);

export default store;
