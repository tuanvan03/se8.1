// import { createStore} from 'redux';
// import Reducers from './reducers';
// const Store = createStore(Reducers);

// export default {Store};
// import { configureStore} from '@reduxjs/toolkit';
// import { applyMiddleware } from 'redux';
// import reducers from './reducers';
// import {thunk} from 'redux-thunk';
// // import logger from 'redux-logger'

// const store = configureStore({
//   reducer: reducers,

//   // Các tuỳ chọn khác nếu cần

// });


// export default store;

// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import rootReducer from './reducers';
// import thunk from 'redux-thunk';

// // Tạo store bằng cách sử dụng configureStore
// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
//   // Thêm các middleware khác nếu cần
//   devTools: process.env.NODE_ENV !== 'production', // Tùy chọn để tắt Redux DevTools trong production
// });

// const getToken = () => store.getState().generalState.token;

// export { store as Store, getToken };
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = configureStore({
  reducer: reducers,
  middleware: [...getDefaultMiddleware(), thunk], // Use getDefaultMiddleware() to include default middleware
  // Other options if needed
});

export default store;



