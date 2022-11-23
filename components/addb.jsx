import myStore from '../reducers/MyStore';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import { Fragment, useState } from "react";
import Grid from '@material-ui/core/Grid';
import MaterialUIPickers from  './datePicker';
import {useDispatch,useSelector} from 'react-redux';
import { handleaopen, handleaclose } from "../actions/Action";
import IconButton from '@material-ui/core/IconButton';
const useStyle = makeStyles((theme) => ({
  paper: { 
    minWidth: "900px" 
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
    button2:{
      margin:theme.spacing.unit,
      color:"#FFFFFF",
      borderColor:"#14AFF1"
  },
    margin: {
      margin: theme.spacing(1),
      color:"#97A1A9",
      //display:'inline-block',
    },
    TextField:{
      border: "1px solid #356680",
      borderRadius: "10px",
      opacity: "1",
      backgroundColor:"#283A46",
      borderColor:"#356680",
    },
  blue:{
    margin: theme.spacing(1),
    color:"#FFFFFF",
    backgroundColor:"#14AFF1",
},
colour:{
  borderColor:"#14AFF1"
},
}));
const  AddFormDialog = () => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const classes=useStyle();
    const open = useSelector((state) => state.opena);
   const dispatch = useDispatch();
   const handleClickOpen = () => dispatch(handleaopen());
   const handleClose = () => dispatch(handleaclose());
    const DialogContent = withStyles(theme => ({
      root: {
        backgroundColor:"#2A3E4C",
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
      },
    }))(MuiDialogContent);
    const DialogActions = withStyles(theme => ({
      root: {
        backgroundColor:"#2A3E4C",
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
      },
    }))(MuiDialogActions);
    return (
        <div>
          <Button variant="outlined"  className={classes.button2} startIcon={<AddIcon />}onClick={handleClickOpen}>
         Add
          </Button>
            <Dialog classes={{ paper: classes.paper}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{backgroundColor:"#2A3E4C"}}><font color='white'>Add Invoice</font>
                <IconButton aria-label="Close" className={classes.closeButton} onClick={handleClose}>
                <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <form action='http://localhost:8080/1805637/addfunction.do' id="info-form">
            <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3}>
              <InputLabel className={classes.margin}  >Customer name <font color="red">*</font></InputLabel></Grid>
              <Grid item xs={6} sm={3}>
              <TextField name='customer_name' className={classes.TextField} type="name"  variant="outlined" /></Grid>
              <Grid item xs={6} sm={3}>
              <InputLabel className={classes.margin}>Due Date<font color="red">*</font></InputLabel></Grid>
              <Grid item xs={6} sm={3}>
<MaterialUIPickers/></Grid>
              <Grid item xs={6} sm={3}>
              <InputLabel className={classes.margin}   >Customer no<font color="red">*</font></InputLabel></Grid>
              <Grid item xs={6} sm={3}>
              <TextField  name='customer_number' className={classes.TextField} type="no"  variant="outlined"/></Grid>
              <Grid item xs={6} sm={3} >
              <InputLabel className={classes.margin}  >Notes<font color="red">*</font></InputLabel></Grid>
              <Grid item xs={6} sm={3} >  
              <TextField id="notes" name='notes' className={classes.TextField}  multiline rows={4} variant="outlined"/></Grid>
              <Grid item xs={3} >
              <InputLabel className={classes.margin}  >Invoice no<font color="red">*</font></InputLabel></Grid>
              <Grid item xs={3} >
              <TextField  name='invoice_id' className={classes.TextField} type="no"  variant="outlined"/></Grid>
              <Grid item xs={3} >
              <InputLabel className={classes.margin}  >Invoice amount<font color="red">*</font></InputLabel></Grid>
              <Grid item xs={3} >
              <TextField name='invoice_amount' className={classes.TextField} type="no"  variant="outlined"/></Grid>
              </Grid>
              {/* <Grid item xs={12} sm={6}> */}
              {/* </Grid> */}
              {/* </Grid> */}
            </DialogContent>
            <DialogActions>
              <div className="ButtonHeader">
              <div className="left">
              <Button onClick={handleClose} style={{color:"#14AFF1"}}>
                Cancel
              </Button>
              </div>
              <div className="right">
              <Button variant="outlined" color="#2C404E" className={classes.colour}  color="#FFFFFF" style={{color:"#FFFFFF",
          borderBlockColor:"#14AFF1",
          borderColor:"#14AFF1"}} onClick={handleClose} color="primary">
                Clear
              </Button>
              <Button type='submit' variant="contained" className={classes.blue}>
               Add
              </Button>
              </div>
              </div>
            </DialogActions>
            </form>
          </Dialog>
        </div>
      );
    }
  export default AddFormDialog