import { Skeleton, TableCell, TableRow } from "@mui/material";
import "./style.css"

export function PatientTableRowPlaceHolder() {
  return (
  <>
    <TableRow className="centered-cells">
      <TableCell align="center">
        <Skeleton variant="circular" width={40} height={40} />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text"  />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text"  width={"50%"}  />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text"  />
      </TableCell>
      <TableCell />
    </TableRow>
  </>
  );
}

    