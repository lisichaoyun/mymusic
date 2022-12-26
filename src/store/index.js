import { configureStore } from '@reduxjs/toolkit'
import defaultion from './default'
export default configureStore({
  reducer: {
    defaultion,
    // 这里放入各个模块
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
