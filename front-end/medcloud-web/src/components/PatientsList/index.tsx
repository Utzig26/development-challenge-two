import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Tooltip, IconButton, CircularProgress} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import PlusIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { PatientRow, PatientToRow} from "../PatientRow";
import patientsService from "../../api/patients.service";
import React from "react";
import './style.css';
import { PatientTableRowPlaceHolder } from "../PatientRow/PatientTableRowPlaceHolder";


export function PatientList() {
  const patients = useAppSelector(state => state.patients)
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    patientsService.getAll(dispatch, patients.perPage);
  }, []);
  
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
              <TableCell />
            </TableRow>
          </TableHead>):(null)
        }
        <TableBody>
          {(patients.patients.length === 0 && patients.loading)? (
            [...Array(patients.perPage)].map((_, i) => <PatientTableRowPlaceHolder key={i} />)
          ):patients.patients.length !== 0? (
            patients.patients.map((patient) => (
              <PatientRow key={patient.id} row={PatientToRow(patient)} />
            ))
          ):(
            <TableRow>
              <TableCell colSpan={5} align="center">
                <h3> No Patients Found </h3>
                <Button variant="contained" color="success" startIcon={<CreateIcon />}>
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
                    color="secondary" 
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

