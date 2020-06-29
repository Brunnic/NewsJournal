import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getPost, updatePost } from "../../actions/posts";

const Update = ({ updatePost, history, match, getPost, post, loading }) => {
  let id = match.params.id;

  useEffect(() => {
    getPost(id)
  });
  
  const [form, setForm] = useState({title: "", body: "", img: ""});

  var { title, body, img} = form;
  
  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    updatePost(id ,form, history);
  };


  return (
    <div className="container">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" className="form-control" id="title" aria-describedby="title" onChange={onChange} value={title} />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea className="form-control" name="body" id="body" cols="30" rows="10" onChange={onChange} value={body}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="img">Image Url</label>
          <input type="text" name="img" className="form-control" id="img" onChange={onChange} value={img} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  post: state.posts.post,
  loading: state.posts.loading
});

export default connect(mapStateToProps, { updatePost, getPost })(withRouter(Update));