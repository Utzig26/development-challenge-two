import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../hooks";
import Header from '../../components/Header'
import { PatientList } from '../../components/PatientsList';

import './style.css';
import { isError, isSnackBar, setMessage } from '../../store/patient.slice';

function Home() {
  const patients = useAppSelector(state => state.patients)
  const dispatch = useAppDispatch();
  return (
    <React.Fragment>
      <Header />
      <div className='page-body'> 
        <PatientList />
        <Snackbar 
          open={patients.snackBar}
          autoHideDuration={6000}
          onClose={() => {
            dispatch(setMessage(''));
            dispatch(isError(false));
            dispatch(isSnackBar(false));
          }}
        >
          <Alert 
          sx={{ width: '100%' }}
          severity={(
            patients.error)? 
            'error' : 
            'success'
          }
          >
            {patients.message}
          </Alert>
        </Snackbar>
      </div>
    </React.Fragment>
  );
}

export default Home
