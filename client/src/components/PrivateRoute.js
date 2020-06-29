import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { setAlert } from "../actions/alerts";

const userNotlogged = (dispatch, setAlert ) => {
  dispatch(setAlert("You need to log in first"));

  return (
    <Redirect to="/login" />
  );
}

const PrivateRoute = ({ component: Component, isAuthenticated, loading, dispatch,...rest}) => (
  <Route {...rest} render={ props => loading ? "loading" : (isAuthenticated ? <Component {...props} /> : userNotlogged(dispatch, setAlert))} />

)

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { setAlert })(PrivateRoute);