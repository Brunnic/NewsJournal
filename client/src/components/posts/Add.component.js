import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createPost } from "../../actions/posts";

const Add = ({ createPost, history }) => {
  const [form, setForm] = useState({title: "", body: "", img: ""});

  const { title, body, img} = form;

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createPost(form, history);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" className="form-control" id="title" aria-describedby="title" onChange={onChange} value={title} />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea className="form-control"  name="body" id="body" cols="30" rows="10" onChange={onChange} value={body}></textarea>
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
  posts: state.posts
});

export default connect(mapStateToProps, { createPost })(withRouter(Add));