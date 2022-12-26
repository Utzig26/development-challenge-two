import React from "react";
import { 
  Avatar, 
  Box,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UserIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';

import patientsService from "../../api/patients.service";
import { setPatient } from "../../store/patient.slice";
import { useAppDispatch } from "../../hooks";
import { ConfirmDialog } from "../ConfirmDialog";
import { PatientDialog } from "../PatientDialog";

export function PatientRow(props: {row: Patient, openPatientDialog: boolean, setopenPatientDialog: Function} ){
  const { row, openPatientDialog, setopenPatientDialog} = props;
  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
      <TableRow key={row.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center">
          <Avatar>
            <UserIcon />
          </Avatar>
        </TableCell>
        <TableCell align="center"> 
          {row.firstName + ' ' + row.lastName}
        </TableCell>
        <TableCell align="center" >
          {(new Date().getFullYear() - new Date(row.birthDate).getFullYear())}
        </TableCell>
        <TableCell align="center">
          {row.email}
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow key={row.id+"-collapse"}>
        <TableCell sx={{paddingBlock:'0px'}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="card-list">
              <Card sx={{ minWidth: 275, maxWidth: 350}}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Address
                  </Typography>
                  <Typography variant="h5" component="div">
                    {row.address.street}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {row.address.city} - {row.address.state}
                  </Typography>
                  <Typography variant="body2">
                    {row.address.zip}
                  </Typography>
                </CardContent>
              </Card>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Tooltip title="Delete">
                  <IconButton color="error"
                    onClick={() => setOpenConfirm(true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <ConfirmDialog
                  open={openConfirm}
                  setOpen={setOpenConfirm}
                  onConfirm={() => {
                    patientsService.delete(dispatch, row.id);
                  }}
                >
                  Are you sure you want to delete this patient?
                </ConfirmDialog>
                <Tooltip title="Edit">
                  <IconButton color="secondary"
                    onClick={() => {
                      dispatch(setPatient(row));
                      setopenPatientDialog(true)}
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <PatientDialog
                  open={openPatientDialog}
                  setOpen={setopenPatientDialog}
                />
              </Stack>
            </Box>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Patient Id: {row.id}
            </Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
