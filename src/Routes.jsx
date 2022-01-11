import React from "react";
import { Switch, Route } from "react-router-dom";

// import Dashboard from '../pages/Dashboard'
import Foods from "./views/pages/Foods";
import Products from "./views/pages/Products";
import Dashboard from "./views/pages/Dashboard";
import Daily from "./views/pages/Daily";
import Activities from "./views/pages/Activities";
import Social from "./views/pages/Social";
import Profile from "./views/pages/Profile";
import UserVsFriend from "./views/pages/UserVsFriend";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/urunler" exact component={Products} />
      <Route path="/yemekler" component={Foods} />
      <Route path="/gunluk" component={Daily} />
      <Route path="/aktiviteler" component={Activities} />
      <Route path="/sosyal" component={Social} />
      <Route path="/profil" component={Profile} />
      <Route path="/denemee" component={Activities} />
      <Route path="/arkadas-ile-karsilastirma" component={UserVsFriend} />
    </Switch>
  );
};

export default Routes;
