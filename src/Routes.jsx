import React from "react";
import { Switch, Route } from "react-router-dom";

// import Dashboard from '../pages/Dashboard'
import Foods from "./views/pages/Foods/Foods";
import Products from "./views/Products/Products";
import Dashboard from "./views/pages/Dashboard/Dashboard";
import Daily from "./views/pages/Daily/Daily";
import Activities from "./views/pages/Activities/Activities";
import Social from "./views/pages/Social/Social";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/urunler" exact component={Products} />
      <Route path="/yemekler" component={Foods} />
      <Route path="/gunluk" component={Daily} />
      <Route path="/aktiviteler" component={Activities} />
      <Route path="/sosyal" component={Social} />

    </Switch>
  );
};

export default Routes;
