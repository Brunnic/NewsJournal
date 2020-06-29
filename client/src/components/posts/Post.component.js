import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { getPost, deletePost } from "../../actions/posts";


const Post = ({ getPost, deletePost, post, loading, match, history, user}) => {
  let id = match.params.id;
  useEffect(() => {
    getPost(id);
  });


  const deleteButton = (
    <button className="btn btn-danger" onClick={() => {
      deletePost(id);
      history.push("/");
    }}>Delete</button>
  );

  

  return (
    <div className="row justify-content-center align-items-center">
      {!loading && post != null && 
        <div className="col-8">
          <h1 className="text-center">{post.title}</h1>
          <img className="d-block img-banner mb-2" src={post.img} alt=""/>
          <p className="lead article-body">{post.body}</p>
          {
            user.username === post.author.username ? 
            <div>
              {deleteButton}
              <Link to={`/edit/${post._id}`} className="btn btn-primary ml-3">Edit</Link>
            </div>

            : (user.role === "Admin" ? deleteButton : "")
          } 
        </div>
        
      }
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  post: state.posts.post,
  loading: state.posts.loading
});

export default connect(mapStateToProps, { getPost, deletePost })(withRouter(Post));