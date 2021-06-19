import React, { useEffect, useMemo, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Checkbox,
  Button,
  makeStyles,
  FormControlLabel,
} from "@material-ui/core";
import { Formik, useFormik } from "formik";
import { GetData, SaveData } from "../Utility/ClientService";
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

function Clients() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const rows = GetData("clients");
  const [clientsData, setClientData] = useState(rows);
  
  const columns = useMemo(()=>[
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
  ],[])

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
        values.clientName = "";
        values.clientAddress = "";
        values.GSTNumber = "";

        //added successfully
        alert("record added successfully.");
      }
    },
  });

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const table = useMemo(()=>{
    return (
      <Table columns={columns} rows={clientsData} />
    )
  },[clientsData, columns])

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Manage Clients
      </Typography>
      <Grid container spacing={2}>
        <form className={classes.clientDetails} onSubmit={formik.handleSubmit}>
          <Grid item>
            <Grid item>
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
            <Grid item>
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
          {table}
        </Grid>
      </Grid>
    </div>
  );
}
export default Clients;
