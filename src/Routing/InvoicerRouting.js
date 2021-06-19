import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Clients from "../Components/Clients";
import Transactions from "../Components/Transactions";
import Accounts from "../Components/Accounts";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
  },
  listElement: {
    listStyleType: "none",
    padding: "10px",
  },
  links: {
    padding: "10px",
    width: "20%",
    background: "#f0f0f0",
  },
}));

const routes = [
  {
    path: "/invoicer/clients",
    exact: true,
    sidebar: () => <div>Clients</div>,
    main: () => <Clients />,
  },
  {
    path: "/invoicer/transactions",
    sidebar: () => <div>Transactions</div>,
    main: () => <Transactions />,
  },
  {
    path: "/invoicer/accounts",
    sidebar: () => <div>Accounts</div>,
    main: () => <Accounts />,
  },
];

function InvoicerRouting() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.main}>
        <div className={classes.links}>
          <ul className={classes.listElement}>
            <li>
              <Link to="/invoicer/clients">Clients</Link>
            </li>
            <li>
              <Link to="/invoicer/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/invoicer/accounts">Accounts</Link>
            </li>
          </ul>
        </div>

        <div>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default InvoicerRouting;
