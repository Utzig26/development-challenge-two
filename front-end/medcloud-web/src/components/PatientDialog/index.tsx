import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PatientForm from "../PatientForm";
const PatientDialog = (props: any) => {
  const { open, setOpen } = props;
  return (
    <Dialog
      open={open}
      onClose={
        () => {
          setOpen(false);
          props = null;
        } 
      }
      aria-labelledby="patient-form"
    >
      <DialogTitle id="patient-form"></DialogTitle>
      <DialogContent>
        <PatientForm 
          setOpen={setOpen}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientDialog;