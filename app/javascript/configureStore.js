import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  products: [],
  categories: [],
  page: 1,
  total_records: 0,
  search: '',
  current_page: 1,
  total_pages: 0
}

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case "DATA_LOADED":
      console.log(action)
      // return state;
      return Object.assign({}, state, action.payload);
    case "PERFORM_SEARCH":
      return Object.assign({}, state, {search: action.search});
    case "SELECT_CATEGORY":
      return Object.assign({}, state, {category_id: action.category_id});
    case "CHANGE_PAGE":
      return Object.assign({}, state, {page: action.page});
    default:
      return state
  }
}

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk))
);

export default store;