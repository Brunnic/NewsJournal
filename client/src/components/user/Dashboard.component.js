import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPosts } from "../../actions/posts";

const Dashboard = ({ user, posts, getPosts }) => {

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const img = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png";

  const getUserPosts = posts.filter((post) => {
    return post.author._id === user._id;
  })

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="user-info text-center col-12">
          <img src={img} className="rounded-circle user-img mt-3"  alt=""/>
          <h3 className="mt-3">{user.username}</h3>
          <h5 className={user.role === "Admin" ? "mt-3 user-admin" : "mt-3"}>{user.role}</h5>
        </div>
        <div className="col-12 mt-3 text-center">
          <div className="user-posts mb-3">
            <h5>Posts: </h5>
            <div className="user-posts-array ">
              {getUserPosts.map((post) => {
              return (
                <div key={post._id} className="border-bottom mb-2">
                  <Link className="user-post-link" to={`/edit/${post._id}`}>{post.title}</Link>
                </div>
              )
              })}
            </div>
          </div>
          <Link className="btn btn-success" to="/addPost">Add a post</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
  posts: state.posts.posts
});

export default connect(mapStateToProps, { getPosts })(Dashboard);