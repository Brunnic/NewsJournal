import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { login } from "../../actions/auth";

const Add = ({ login, history, isAuthenticated }) => {
  const [form, setForm] = useState({email: "", password: ""});

  const { email, password} = form;

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    
    login(form, history);

  };

  return (
    <div className="container">
      {
        !isAuthenticated ?
        <div>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className="form-control" id="email" aria-describedby="email" onChange={onChange} value={email} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" id="password" onChange={onChange} value={password} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        :
      <Redirect to="/" />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(withRouter(Add));