// src/redux/index.js

import { combineReducers } from 'redux';

// Placeholder reducer
const placeholderReducer = (state = {}, action) => state;

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  // Add your other reducers here
  placeholder: placeholderReducer
});

export default rootReducer;
