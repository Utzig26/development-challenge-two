import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Tooltip, IconButton, CircularProgress} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import PlusIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { PatientRow } from "../PatientRow";
import patientsService from "../../api/patients.service";

import { PatientTableRowPlaceHolder } from "../PatientRow/PatientTableRowPlaceHolder";
import PatientDialog from "../PatientDialog";
import React from "react";
import { setPatient } from "../../store/patient.slice";


export function PatientList() {
  const patients = useAppSelector(state => state.patients)
  const [openPatientDialog, setopenPatientDialog] = React.useState(false);
  const dispatch = useAppDispatch();
  return (
    <TableContainer className="table-container" component={Paper}>
      <Table aria-label="collapsible table">
        {patients.patients.length > 0? (
          <TableHead>
            <TableRow>
              <TableCell size="small"/>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center"> 
                <Tooltip title="Create Patient">
                  <IconButton  
                  color="success" 
                  onClick={() => {                       
                    dispatch(setPatient(undefined));
                    setopenPatientDialog(true)}
                  }>
                    <PlusIcon />
                  </IconButton>
                </Tooltip>
                <PatientDialog
                  open={openPatientDialog}
                  setOpen={setopenPatientDialog}
                />
              </TableCell>
            </TableRow>
          </TableHead>):(null)
        }
        <TableBody>
          {(patients.patients.length === 0 && patients.loading)? (
            [...Array(patients.perPage)].map((_, i) => <PatientTableRowPlaceHolder key={i} />)
          ):patients.patients.length > 0? (
            patients.patients.map((patient) => (
              <PatientRow key={patient.id} row={patient} openPatientDialog={openPatientDialog} setopenPatientDialog={setopenPatientDialog} />
            ))
          ):(
            <TableRow>
              <TableCell colSpan={5} align="center">
                <h3> No Patients Found </h3>
                <Button variant="contained" 
                color="success" 
                startIcon={<CreateIcon />}
                onClick={() => {<PatientDialog />}}
                >
                  Create
                </Button>
              </TableCell>
            </TableRow>
          )}
          {(patients.patients.length > 0 && patients.lastKey)? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Tooltip title="Load more Patients">
                  {patients.loading? (
                    <CircularProgress />
                  ):(
                    <IconButton 
                    color="warning" 
                    onClick={() => {
                      patientsService.getAll(dispatch, patients.perPage, patients.lastKey);
                    }}>
                      <PlusIcon />
                    </IconButton>
                    )}
                </Tooltip>
              </TableCell>
            </TableRow>
            ):(null)
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

