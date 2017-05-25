import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
    <Link to="/" className="navbar-brand">Fideligard</Link>
  </nav>
);

export default withRouter(Navbar);
