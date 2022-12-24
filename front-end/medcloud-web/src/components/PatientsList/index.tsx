import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { PatientRow, PatientToRow} from "../PatientRow";
import patientsService from "../../api/patients.service";
import React from "react";
import './style.css';
import { PatientTableRowPlaceHolder } from "./PatientTableRowPlaceHolder";

export function PatientList() {
  const patients = useAppSelector(state => state.patients)
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    patientsService.getAll(dispatch, patients.perPage);
  }, []);
  
  return (
    <TableContainer className="table-container" component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell size="small"/>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.loading? (
            [...Array(patients.perPage)].map(() => <PatientTableRowPlaceHolder />)
          ):patients.error? (
            <PatientTableRowPlaceHolder />
          ):(
            patients.patients.map((patient) => (
              <PatientRow key={patient.id} row={PatientToRow(patient)} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

