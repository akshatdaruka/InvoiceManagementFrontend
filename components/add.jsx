import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles((theme) => ({
  ebutton: {
    color: "white",
    borderColor:'white',
  },
}));
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" className={classes.ebutton} onClick={handleClickOpen} startIcon={<AddIcon/>}>
        Add
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Add Invoice
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
        <table>
            <tr>
                <th>Customer Name</th>
                <th>Customer No</th>
                <th>Invoice No</th>
                <th>Invoice Amount</th>
            </tr>
            <tr>
                <th><TextField id="outlined-basic" variant="outlined" /></th>
                <th><TextField id="outlined-basic" variant="outlined" /></th>
                <th><TextField id="outlined-basic" variant="outlined" /></th>
                <th><TextField id="outlined-basic" variant="outlined" /></th>
            </tr>
        </table>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button >Cancel</Button>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Reset
      </Button>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Save
      </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}