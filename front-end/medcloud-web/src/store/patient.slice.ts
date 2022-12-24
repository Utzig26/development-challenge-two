import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const patientInit:PatientState = {
  loading: false,
  error: false,
  message: '',
  patients: []
}

export const patientSlice = createSlice({
  name: 'patient',
  initialState: patientInit,
  reducers: {
    isLoading: (state:PatientState, action:PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    isError: (state:PatientState, action:PayloadAction<boolean>) => {
      state.error = action.payload
    },
    setMessage: (state:PatientState, action:PayloadAction<string>) => {
      state.message = action.payload
    },
    setPatients: (state:PatientState, action:PayloadAction<Patient[]>) => {
      state.patients = action.payload
    }
  }
})

export const { isLoading, isError, setMessage, setPatients} = patientSlice.actions

export default patientSlice.reducer