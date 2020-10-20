import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./products/Index";
import Product from "./products/Show";

class Routes extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/products/:product_id" component={Product} />
        </Switch>
      </Router>
    );
  }
}

export default Routes
