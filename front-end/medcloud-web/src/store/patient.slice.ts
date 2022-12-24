import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const patientZero:PatientState = {
  loading: false,
  error: false,
  message: ''
}

export const patientSlice = createSlice({
  name: 'patient',
  initialState: patientZero,
  reducers: {
    setLoading: (state:PatientState, action:PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state:PatientState, action:PayloadAction<boolean>) => {
      state.error = action.payload
    },
    setMessage: (state:PatientState, action:PayloadAction<string>) => {
      state.message = action.payload
    }
  }
})

export const { setLoading, setError, setMessage } = patientSlice.actions

export default patientSlice.reducer