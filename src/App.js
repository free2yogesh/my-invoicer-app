import './App.css';
import React from "react";
import InvoicerRouting from "./Routing/InvoicerRouting";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    height:"100%",
    width:"100%",
  },

}));

export default function App() {
  const classes = useStyles();
  return (
    <div class="f-container fixed-hf">
      <header>
        <h2>Invoicer App</h2>
      </header>
      <div className={classes.main}>
        <InvoicerRouting />
      </div>
      <footer>
        <h4>Copy Rights</h4>
      </footer>
    </div>
  );
}

