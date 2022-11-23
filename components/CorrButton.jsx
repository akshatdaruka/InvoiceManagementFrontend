
import React, { useState } from "react";
import { Dialog, Button } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "../index.css";

const buttonStyle = {
  borderColor:'#39495E',
  padding: "7px",
  maxHeight: "29px",
  color: "white",
  fontSize: "10px",
  //size: "small",
};
const buttonColor = {
  backgroundColor: "#14aff1",
};

const ViewCorrespondenseButton = () => {
  /*constructor() {
    super();
    this.onClickClose = this.onClickClose.bind(this);

    this.state = {
      open: false,
    };
  }*/
  const [open, setOpen] = useState(false)
  

  const onClickClose = () => {
    setOpen(!open);
  }

  const handleToggle = () => {
    setOpen(!open);
  };
    return (
      <>
        <Button
          onClick={handleToggle}
          className="corrButton"
          variant="outlined"
          style={buttonStyle}
        >
          View Correspondence
        </Button>
        <div className="dialog-div">
          <Dialog
            open={open}
            onClose={setOpen}
            maxWidth="xl"
            // fullWidth="true"
            PaperProps={{
              style: {
                backgroundColor: "#2d424f",
                color: "white",
              },
            }}
          >
            <DialogTitle id="form-dialog-title">
              <div style={{ display: "flex" }}>
                <Typography
                  variant="h6"
                  Component="div"
                  style={{ flexGrow: 1 }}
                >
                  View Correspondence
                </Typography>
                <p>View</p>&nbsp;&nbsp;
                <FormControl variant="outlined" size="small">
                  {/* <InputLabel id="demo-simple-select-outlined-label">
                    Template
                  </InputLabel> */}
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Template 1</em>
                    </MenuItem>
                    <MenuItem>Template 1</MenuItem>
                    <MenuItem>Template 2</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  onClick={onClickClose}
                  color="secondary"
                  variant="raised"
                  style={buttonStyle}
                >
                  <CloseIcon />
                </Button>
              </div>
            </DialogTitle>
            <DialogContent dividers>
              <Typography>
                <p>
                  Subject:
                  <strong>Invoice Details-Account Name</strong>
                </p>
                <br />
                <p>
                  Dear Sir/Madam,
                  <br />
                  Greetings !!!
                  <p />
                  <br />
                  <p>
                    This is to remind you that there are one or more open
                    invoices on your account. Please provide at your earliest
                    convenience an update on the payment details or clarify the
                    reason for the delay. If you have any specific issue with
                    the invoice(s), please let us know so that we can address it
                    to the correct Department.
                  </p>
                  <br />
                  <p> Please find the details of the invoices below:</p>
                  <br />
                  <p>
Total Amount to be Paid:<strong> $124.00K</strong>
                  </p>
                  <br />
                  <p>
                    In case you have already made a payment for the above Items,
                    please send us the details to ensure the payment is posted.
                    <br />
                    Let us know if we can be of any further assistance. Looking
                    forward to hearing from you.
                  </p>
                  <br />
                  <p>
                    Kind Regards,
                    <br /> [Sender's First Name][Sender's Last Name]
                    <br />
                    Phone: [Sender's contact number] <br />
                    Fax: (if any)
                    <br /> Email : (Sender's Email Address)
                    <br /> Company Name(Sender's Company Name)
                  </p>
                </p>
              </Typography>
            </DialogContent>
            <DialogActions>
              <div
                style={{
                  display: "flex",
                }}
              >
                <div>
                  <Button
                    className="can-btn"
                    color="primary"
                    variant="raised"
                    onClick={onClickClose}
                    style={buttonStyle}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    style={(buttonStyle, buttonColor)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  
}

export default ViewCorrespondenseButton;