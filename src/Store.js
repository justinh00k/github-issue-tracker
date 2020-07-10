import { configureStore } from '@reduxjs/toolkit';
import login from './reducers/login';

export default configureStore({
  reducer: {
    login: login,
  },
});
