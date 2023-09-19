import { configureStore } from '@reduxjs/toolkit'
import snackBarReducer from './redux/snackbarSlice'

export default configureStore({
  reducer: {
      snackBar: snackBarReducer
  },
})