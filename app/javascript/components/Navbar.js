import React from "react"
import PropTypes from "prop-types"
import { NavLink, useLocation } from "react-router-dom"
import classNames from "classnames"

class Navbar extends React.Component {
  render () {
    return (
      <React.Fragment>
        <nav className='navbar navbar-dark bg-primary navbar-expand-lg my-3'>
          <div className='navbar-nav'>
            <NavLink exact to="/" className='nav-link' activeClassName='active'>Products</NavLink>
            <NavLink to="/basket" className='nav-link' activeClassName='active'>Basket</NavLink>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar
