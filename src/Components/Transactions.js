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
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@material-ui/core";
import { useFormik } from "formik";
import { GetData, SaveData } from "../Utility/DataService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "20px",
    width: "100%",
  },
  details: {
    padding: "10px",
    marginBottom: "10px",
  },
  saveButton: {
    marginTop: "10px",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Transactions() {
  const classes = useStyles();
  const cltData = GetData("clients");
  const txData = GetData("transactions");
  const acData = GetData("accounts");
  const [transactionsData, SetTransactionsData] = useState(txData);
  const [clientsData, setClientData] = useState(cltData);
  const [accountsData, setAccountsData] = useState(acData);
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      invoiceCode: "",
      invoiceDate: "",
      client: "",
      account: "",
    },
    onSubmit: (values) => {
      if (values.invoiceCode) {
        txData.push(values);
        setClientData(txData);
        SaveData("transactions", txData);
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

  return (
    <form className={classes.details} onSubmit={formik.handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Manage Transactions
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
          message="New Transactions Saved."
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
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={6}>
              <TextField
                required="true"
                id="invoiceCode"
                variant="outlined"
                size="small"
                label="Invoice Code"
                name="invoiceCode"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="invoiceDate"
                variant="outlined"
                size="small"
                label="Invoice Date"
                name="invoiceDate"
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Client
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={formik.handleChange}
                    label="Client"
                  >
                    {clientsData.map((e, key) => {
                      return (
                        <MenuItem key={key} value={e.clientName}>
                          {e.clientName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    From Account
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    //value={account}
                    onChange={formik.handleChange}
                    label="From Account"
                  >
                    {accountsData.map((e, key) => {
                      return (
                        <MenuItem key={key} value={e.accountName}>
                          {e.accountName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
export default Transactions;
