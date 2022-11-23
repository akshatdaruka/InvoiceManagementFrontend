import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
//import './addbutton.css';


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

export default function AddButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const textStyle = {
    width:"22vh",
    margin:"1.5vh", 
    display:"table-cell", 
    borderRadius:"1vh", 
    border:"1px solid #356680",
    backgroundColor:"#283A46", 
    color:"white",
    height:"4vh"
  };

  const labelStyle = {
    display:"table-cell",
    verticalAign:"middle"
  }
  
  const add1 = {
    color:"white",
    textTransform:"none",
    borderColor:"#14AFF1",
    height:"4.5vh",
    width:"1vw",
    fontSize:"2vh",
    padding:"1vh"
  };

  const add2 = {
    backgroundColor: "#14AFF1",
    color:"white",
    textTransform:"none",
    height:"4.5vh",
    width:"1vw",
    fontSize:"2vh",
    padding:"1vh"
  }

  return (
    <div style={{float:"right"}}>
      <Button variant="outlined" color="primary"  startIcon={<EditIcon />} onClick={handleClickOpen} style={{...add1}}>
        Edit
      </Button>
      <Dialog  aria-labelledby="customized-dialog-title" open={open} PaperProps={{style: {backgroundColor: "#2A3E4C", color:"white"}}}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Invoice
        </DialogTitle>
        <DialogContent dividers>
          <div style={{width:"100%", float:"left",fontSize:"2vh",display:"table"}}>
            <div style={{display:"table-row"}}>
              <label style={{...labelStyle}}>Invoice Amount<span style={{color:"#FF5B5B"}}> *</span></label>
              <input type="text" style={{...textStyle}} required></input>
            </div>
            <div style={{display:"table-row"}}>
              <label for="textarea" style={{...labelStyle,verticalAlign:"top"}}>Notes</label>
              <textarea id="textarea" style={{...textStyle,height:"17vh"}}></textarea>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{marginRight:"20vh", textTransform:"none", color:"#14AFF1", cursor:"pointer"}} onClick={handleClose}>
            Cancel
          </div>
          <Button variant="outlined" autoFocus onClick={handleClose} color="primary" style={{...add1}}>
            Reset
          </Button>
          <Button variant="contained" autoFocus onClick={handleClose} color="primary" style={{...add2}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
