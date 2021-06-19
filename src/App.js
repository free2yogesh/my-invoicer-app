import './App.css';
import React from "react";
import InvoicerRouting from "./Routing/InvoicerRouting";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
  },

}));

export default function App() {
  const classes = useStyles();
  return (
    <div class="f-container fixed-hf">
      <header>
        <h2>Invoicer Application</h2>
      </header>
      <div class="main">
        <InvoicerRouting />
      </div>
      <footer>
        <h4>Copy Rights</h4>
      </footer>
    </div>
  );
}

