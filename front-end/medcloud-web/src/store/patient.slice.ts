import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const patientInit:PatientState = {
  loading: false,
  error: false,
  snackBar: false,
  message: '',
  patients: [],
  perPage: 5
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
    isSnackBar: (state:PatientState, action:PayloadAction<boolean>) => {
      state.snackBar = action.payload
    },
    setMessage: (state:PatientState, action:PayloadAction<string>) => {
      state.message = action.payload
    },
    setPatients: (state:PatientState, action:PayloadAction<Patient[]>) => {
      state.patients = action.payload
    },
    setPerPage: (state:PatientState, action:PayloadAction<number>) => {
      state.perPage = action.payload
    },
    filterPatients: (state:PatientState, action:PayloadAction<string>) => {
      state.patients = state.patients.filter((patient) => patient.id !== action.payload)
    }
  }
})

export const { isLoading, isError, isSnackBar, setMessage, setPatients, setPerPage, filterPatients} = patientSlice.actions

export default patientSlice.reducer