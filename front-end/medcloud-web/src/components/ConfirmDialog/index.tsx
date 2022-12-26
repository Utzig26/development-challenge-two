import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle 
} from "@mui/material";

export function ConfirmDialog(props: any) {
  const { open, setOpen, onConfirm, children } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog"></DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => setOpen(false)}
        >
          No
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
