import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Products from "./products/Index";
import Product from "./products/Show";
import Basket from "./Basket";
import Navbar from "./Navbar";
import store from "../configureStore"

class Routes extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/products/:product_id" component={Product} />
            <Route path="/basket" component={Basket} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default Routes
