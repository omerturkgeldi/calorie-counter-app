import React from "react";
import { Switch, Route } from "react-router-dom";

// import Dashboard from '../pages/Dashboard'
import Foods from "./views/Foods/Foods";
import Products from "./views/Products/Products";
import Dashboard from "./views/Dashboard/Dashboard";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/urunler" exact component={Products} />
      <Route path="/yemekler" component={Foods} />
    </Switch>
  );
};

export default Routes;
