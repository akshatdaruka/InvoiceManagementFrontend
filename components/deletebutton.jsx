import React, {useState, useEffect} from 'react';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import RemoveIcon from '@material-ui/icons/Remove';
import { connect } from 'react-redux';
import myStore from '../reducers/MyStore';


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

function DelButton() {
  const [open, setOpen] = React.useState(false);
  const deletedata = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/1805637/delete`,
      params: {
          invoice: selected[0]
      },
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

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
  const add3 = {
    color:"white",
    textTransform:"none",
    borderColor:"#14AFF1",
    height:"4.5vh",
    width:"100px",
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
  var selected=myStore.getState().selecteddata;
  React.useEffect(() => {
    console.log(selected)
  }, [selected]);
  return (
    <div style={{float:"right"}}>
      <Button isabled={selected.length === 1 ? false : true} variant="outlined" color="primary" startIcon={<RemoveIcon />} onClick={handleClickOpen} style={{...add3}}>
        Delete
      </Button>
      <Dialog  aria-labelledby="customized-dialog-title" open={open} PaperProps={{style: {backgroundColor: "#2A3E4C", color:"white"}}}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Delete record(s)?
        </DialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom>
            You'll loose record(s) after this action.We can't recover them once you delete.
          </Typography>
          <br />
          <Typography gutterBottom>
            Are u sure u want to permantly delete them?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" autoFocus onClick={handleClose} color="primary" style={{...add1}}>
            Cancel
          </Button>
          <Button variant="contained" autoFocus onClick={deletedata} color="primary" style={{...add2}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStoreToProps = (state) => {
  return {
    selecteddata: state.selecteddata,
  };
};
export default connect(mapStoreToProps)(DelButton);