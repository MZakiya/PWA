import { createSlice } from '@reduxjs/toolkit'

export const snackBarSlice = createSlice({
  name: 'snackBar',
  initialState: {
    message: '',
    severity: '',
    showSnackBar: false
  },
  reducers: {
    showSnackBar: (state, action) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.showSnackBar = true;
    },
    hideSnackBar: (state, action) => {
        state.showSnackBar = false
      },
  },
})

// Action creators are generated for each case reducer function
export const { showSnackBar, hideSnackBar } = snackBarSlice.actions

export default snackBarSlice.reducer