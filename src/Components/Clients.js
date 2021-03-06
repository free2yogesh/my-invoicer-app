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
    padding: "10px",
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

function Clients() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const rows = GetData("clients");
  const [clientsData, setClientData] = useState(rows);
  const [open, setOpen] = React.useState(false);

  const columns = useMemo(
    () => [
      {
        label: "Client Name",
        id: "clientName",
      },
      {
        label: "Client Address",
        id: "clientAddress",
      },
      {
        label: "GST Number",
        id: "GSTNumber",
      },
    ],
    []
  );

  const formik = useFormik({
    initialValues: {
      clientId: "",
      clientName: "",
      clientAddress: "",
      GSTNumber: "",
    },
    onSubmit: (values) => {
      if (values.clientName) {
        rows.push(values);
        setClientData(rows);
        SaveData("clients", rows);

        //reset form
        setOpen(true);
        //added successfully
        //alert("record added successfully.");
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
        Manage Clients
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
          message="Client Details Added."
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
              <form
                className={classes.clientDetails}
                onSubmit={formik.handleSubmit}
              >
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required="true"
                        id="clientName"
                        variant="outlined"
                        size="small"
                        label="Client Name"
                        name="clientName"
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="clientAddress"
                        multiline
                        rows={4}
                        variant="outlined"
                        size="small"
                        label="Client Address"
                        name="clientAddress"
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
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
                      <Grid item xs={12}>
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
              </form>
            </Grid>
            <Grid item xs={6} className="clientTable">
              <Table columns={columns} rows={clientsData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default Clients;
