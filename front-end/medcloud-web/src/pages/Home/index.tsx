import React from 'react';
import { Alert, CircularProgress, Grid, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../hooks";
import Header from '../../components/Header'
import { PatientList } from '../../components/PatientsList';

import { isError, isSnackBar, setMessage } from '../../store/patient.slice';
import patientsService from '../../api/patients.service';

function Home() {
  const patients = useAppSelector(state => state.patients)
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    patientsService.getAll(dispatch, patients.perPage);
  }, []);
  
  return (
    <>
      <Header />
      <Grid container justifyContent={"center"}> 
        <Grid item xs={10} md={9} lg={8} xl={7}>
          <PatientList />
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          color="primary"
          open={patients.loading}
        >
          <CircularProgress />
        </Snackbar>
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
      </Grid>
    </>
  );
}

export default Home
