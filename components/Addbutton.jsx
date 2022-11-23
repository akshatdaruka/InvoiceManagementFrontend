import React from 'react';
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
  var datasend
  const handlesubmit = () => {
    datasend = {
      name_customer: document.getElementById("name").value,
      cust_number:document.getElementById("number").value,
      invoice_id: document.getElementById("invno").value,
      total_open_amount: document.getElementById("inva").value,
      due_in_date:document.getElementById("date").value,
      notes:document.getElementById("notes").value,
    };
    console.log(datasend)
    getData()
  };
  const getData = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/1805637/add`,
      params: datasend,
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
      <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{...add1}}>
        + Add
      </Button>
      <Dialog  aria-labelledby="customized-dialog-title" open={open} PaperProps={{style: {backgroundColor: "#2A3E4C", color:"white"}}}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Invoice
        </DialogTitle>
        <DialogContent dividers>
          <form id="adding">
          <div style={{width:"54%", float:"left",fontSize:"2vh",display:"table"}}>
            <div style={{display:"table-row"}}>
              <label style={{...labelStyle}}>Customer Name<span style={{color:"#FF5B5B"}}> *</span></label>
              <input type="text" style={{...textStyle}}id="name" required></input>
            </div>
            
            <div style={{display:"table-row"}}>
              <label style={{...labelStyle}}>Customer No.<span style={{color:"#FF5B5B"}}> *</span></label>
              <input type="text" style={{...textStyle}} id="number" required></input>
            </div>
            
            <div style={{display:"table-row"}}>
              <label style={{...labelStyle}}>sales_order_id<span style={{color:"#FF5B5B"}}> *</span></label>
              <input type="text" style={{...textStyle}}id="invno" required></input>
            </div>

            <div style={{display:"table-row"}}>
              <label style={{...labelStyle}}>Invoice Amount<span style={{color:"#FF5B5B"}}> *</span></label>
              <input type="text" style={{...textStyle}} id="inva" required></input>
            </div>
          </div>

          <div style={{width:"46%", float:"right",fontSize:"2vh",display:"table"}}>
            <div style={{display:"table-row"}}>
              <label style={{...labelStyle}}>Due Date<span style={{color:"#FF5B5B"}}> *</span></label>
              <input type="date" style={{...textStyle}} id="date" placeholder="" required></input>
            </div>
            
            <div style={{display:"table-row"}}>
              <label for="textarea" style={{...labelStyle,verticalAlign:"top"}}>Notes</label>
              <textarea id="textarea" style={{...textStyle,height:"17vh"}} id="notes"></textarea>
            </div>
          </div>
          </form>
        </DialogContent>
        <DialogActions>
          <div style={{marginRight:"50vh", textTransform:"none", color:"#14AFF1", cursor:"pointer"}} onClick={handleClose}>
            Cancel
          </div>
          <Button variant="outlined" autoFocus onClick={handleClose} color="primary" style={{...add1}}>
            Clear
          </Button>
          <Button variant="contained" autoFocus onClick={handlesubmit} color="primary" style={{...add2}}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
