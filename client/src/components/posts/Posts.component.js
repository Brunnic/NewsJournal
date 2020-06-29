import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


import { getPosts } from "../../actions/posts";

const Posts = ({ getPosts, posts }) => {


  useEffect(() => {
    getPosts();
  }, [getPosts]);


  const allPosts = posts.posts.map((post) => {
    return (
      <div className="article-link mb-3" key={post._id}>
        <h1><Link to={"post/" + post._id}>{post.title}</Link></h1>
        <h6 className="article-author">Posted by <span className="article-author-name">{post.author.username}</span></h6>
        <h5>{post.createdAt}</h5>
          <div >
            <p>{post.body}</p>
            <img className="article-img d-block mx-auto" src={post.img} alt=""/>
          </div>
      </div> 
    )
  })

  return (
    <div className="main-posts-holder">
      {posts.loading ? "Loading" : <div className="container">
        <div className="row">
          <div className="col-lg-9">
          {allPosts}
          </div>
          <div className="col-lg-3">
            <form>
              <div className="form-row">
                <div className="col">
                  <input type="text" name="search" className="form-control" placeholder="Search"/>
                </div>
                <div className="col">
                  <button className="btn btn-success" type="submit">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> }
    </div>
  );
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, { getPosts })(Posts);