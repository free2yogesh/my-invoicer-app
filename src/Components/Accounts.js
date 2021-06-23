import React, { useMemo, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Checkbox,
  Button,
  makeStyles,
  FormControlLabel,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { useFormik } from "formik";
import { GetData, SaveData } from "../Utility/DataService";
import Table from "../Common/Table";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "20px",
    width: "100%",
  },
  clientTable: {
    padding: "10px",
    marginLeft: "50px",
  },
  clientDetails: {
    padding: "10px",
    marginBottom: "10px",
  },
  saveButton: {
    marginTop: "10px",
  },
}));

function Accounts() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const rows = GetData("accounts");
  const [accountsData, setAccountsData] = useState(rows);
  const [open, setOpen] = React.useState(false);

  const columns = useMemo(
    () => [
      {
        label: "Account Name",
        id: "accountName",
      },
      {
        label: "Account Address",
        id: "accountAddress",
      },
      {
        label: "PAN",
        id: "PAN",
      },
      {
        label: "GST Number",
        id: "GSTNumber",
      },
      {
        label: "Bank Details",
        id: "bankDetails",
      },
    ],
    []
  );

  const formik = useFormik({
    initialValues: {
      accountId:"",
      accountName: "",
      accountAddress: "",
      PAN: "",
      GSTNumber: "",
      accountNumber:"",
      bankName:"",
      IFSCCode:"",
      bankBranch:"",
    },
    onSubmit: (values) => {
      if (values.accountName) {
        rows.push(values);
        setAccountsData(rows);
        SaveData("accounts", rows);
        setOpen(true);
      }
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Manage Accounts
      </Typography>
      {open && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Account Details Added."
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <Button color="secondary" size="small" onClick={handleClose}>
                  Close
                </Button>
              </IconButton>
            </React.Fragment>
          }
        />
      )}

      <Grid container spacing={2}>
        <form className={classes.clientDetails} onSubmit={formik.handleSubmit}>
          <Grid item>
            <Grid item>
              <TextField
                required="true"
                id="accountName"
                variant="outlined"
                size="small"
                label="Account Name"
                name="accountName"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="accountAddress"
                multiline
                rows={4}
                variant="outlined"
                size="small"
                label="Account Address"
                name="accountAddress"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                required="true"
                id="PAN"
                variant="outlined"
                size="small"
                label="PAN"
                name="PAN"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name="GSTApplicable"
                    color="primary"
                  />
                }
                label="GST Applicable"
              />
            </Grid>
            {checked && (
              <Grid item>
                <TextField
                  id="GSTNumber"
                  variant="outlined"
                  size="small"
                  label="GST Number"
                  name="GSTNumber"
                  onChange={formik.handleChange}
                />
              </Grid>
            )}

              <Grid item>
                <TextField
                  id="accountNumber"
                  variant="outlined"
                  size="small"
                  label="Account Number"
                  name="accountNumber"
                  onChange={formik.handleChange}
                />
              </Grid>
              
              <Grid item>
                <TextField
                  id="bankName"
                  variant="outlined"
                  size="small"
                  label="Bank Name"
                  name="bankName"
                  onChange={formik.handleChange}
                />
              </Grid>
              
              <Grid item>
                <TextField
                  id="bankBranch"
                  variant="outlined"
                  size="small"
                  label="Bank Branch"
                  name="bankBranch"
                  onChange={formik.handleChange}
                />
              </Grid>
              
              <Grid item>
                <TextField
                  id="IFSCCode"
                  variant="outlined"
                  size="small"
                  label="IFSC Code"
                  name="IFSCCode"
                  onChange={formik.handleChange}
                />
              </Grid> 

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.saveButton}
                type="Submit"
                disabled={!formik.isValid}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>

        <Grid item className="clientTable">
          <Table columns={columns} rows={accountsData} />
        </Grid>
      </Grid>
    </div>
  );
}

  export default Accounts;