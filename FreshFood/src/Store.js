// import { createStore} from 'redux';
// import Reducers from './reducers';
// const Store = createStore(Reducers);

// export default {Store};
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

const store = configureStore({
  reducer: reducers,
  // Các tuỳ chọn khác nếu cần
});

export default store;
