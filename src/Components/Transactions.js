import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  makeStyles,
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
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  selectControl: {
    margin: theme.spacing(1),
    minWidth: 150,
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
  const [inputList, setInputList] = useState([{ description: "", amount: "" }]);

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

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { description: "", amount: "" }]);
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
      <Grid container className={classes.root} justify="center" spacing={2}>
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
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.selectControl}>
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
              <FormControl variant="outlined" className={classes.selectControl}>
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
        </Grid>

        {inputList.map((x, i) => {
          return (
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    id="description"
                    variant="outlined"
                    size="small"
                    label="Description"
                    name="description"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="amount"
                    variant="outlined"
                    size="small"
                    label="Amount"
                    name="amount"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <div className="btn-box">
                    {inputList.length !== 1 && (
                      <button
                        className="mr10"
                        onClick={() => handleRemoveClick(i)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div className="btn-box">
                    {inputList.length - 1 === i && (
                      <button onClick={handleAddClick}>Add</button>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
        <Grid item xs={12}>
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
  );
}
export default Transactions;
