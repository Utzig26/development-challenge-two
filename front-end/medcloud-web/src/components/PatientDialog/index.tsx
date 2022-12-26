import { 
  Button, 
  Dialog, 
  DialogActions,
  DialogContent, 
  DialogTitle 
} from "@mui/material";
import PatientForm from "../PatientForm";

export function PatientDialog (props: { open: boolean, setOpen: Function }) {
  const { open, setOpen } = props;
  return (
    <Dialog
      open={open}
      onClose={
        () => {
          setOpen(false);
        } 
      }
      aria-labelledby="patient-form"
      id="patient-form"
    >
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