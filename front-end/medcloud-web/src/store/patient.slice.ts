import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const patientInit:PatientState = {
  loading: false,
  error: false,
  snackBar: false,
  lastKey: '',
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
    setLastKey: (state:PatientState, action:PayloadAction<string>) => {
      state.lastKey = action.payload
    },
    setMessage: (state:PatientState, action:PayloadAction<string>) => {
      state.message = action.payload
    },
    setPatients: (state:PatientState, action:PayloadAction<Patient[]>) => {
      state.patients = state.patients.concat(action.payload)
    },
    setPerPage: (state:PatientState, action:PayloadAction<number>) => {
      state.perPage = action.payload
    },
    filterPatients: (state:PatientState, action:PayloadAction<string>) => {
      state.patients = state.patients.filter((patient) => patient.id !== action.payload)
    },
    updatePatient: (state:PatientState, action:PayloadAction<Patient>) => {
      const index = state.patients.findIndex((patient) => patient.id === action.payload.id)
      if (index !== -1) {
        const newPatients = state.patients
        newPatients[index] = action.payload
        state.patients = newPatients
      }
    }
  }
})

export const { 
  isLoading, 
  isError, 
  isSnackBar, 
  setLastKey, 
  setMessage, 
  setPatients, 
  setPerPage, 
  filterPatients, 
  updatePatient
} = patientSlice.actions

export default patientSlice.reducer