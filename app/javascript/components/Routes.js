import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./products/Index";
import Product from "./products/Show";
import Basket from "./Basket";
import Navbar from "./Navbar";

class Routes extends React.Component {
  render () {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/products/:product_id" component={Product} />
          <Route path="/basket" component={Basket} />
        </Switch>
      </Router>
    );
  }
}

export default Routes
