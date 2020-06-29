import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { register } from "../../actions/auth";

const Add = ({ register, history, isAuthenticated }) => {
  const [form, setForm] = useState({ username: "", email: "", password: ""});

  const { username, email, password} = form;

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    
    register(form, history);
  };

  return (
    <div className="container">
      {
        !isAuthenticated ?
        <div>
          <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="username" name="username" className="form-control" id="username" aria-describedby="username" onChange={onChange} value={username} />
            </div>
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

export default connect(mapStateToProps, { register })(withRouter(Add));