import { Avatar, Box, Card, CardContent, Collapse, IconButton, Stack, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from "react";
import UserIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import patientsService from "../../api/patients.service";
import './style.css';
import { useAppDispatch, useAppSelector } from "../../hooks";
import ConfirmDialog from "../ConfirmDialog";

export function PatientToRow ( patient: Patient ) {
  const newPatient = {
    id: patient.id,
    name: patient.firstName + ' ' + patient.lastName,
    age: (new Date().getFullYear() - new Date(patient.birthDate).getFullYear()),
    address: patient.address,
    email: patient.email
  }
  return newPatient;
}

export function PatientRow(props: { row: ReturnType<typeof PatientToRow> }){
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <TableRow key={row.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center">
          <Avatar>
            <UserIcon />
          </Avatar>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.age}</TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                <Tooltip title="Update">
                  <IconButton color="info" >
                    <UpdateIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Patient Id: {row.id}
            </Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
