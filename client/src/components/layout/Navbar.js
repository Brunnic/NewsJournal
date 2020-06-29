import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";

const Navbar = ({ auth, logout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <Link className="navbar-brand" to="/">NewsJournal</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="#">Politics</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Sports</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Economie</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">International</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Culture</Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        {
          auth.loading ? <div>Loading</div> : (
            !auth.isAuthenticated ? 
            <Fragment>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </Fragment>
          : 
          <Fragment>
            <li className="nav-item">
              <Link to="/user" className="nav-link">Hello, {auth.user.username}</Link>
            </li>
            <li className="nav-item">
              <a onClick={logout} className="nav-link" href="#">Logout</a>
            </li>
          </Fragment>
          )
          
        }
      </ul>
    </div>
  </nav>
);

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, { logout })(Navbar);