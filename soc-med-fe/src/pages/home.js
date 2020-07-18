import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";
// Components and utils
import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";
import PostSkeleton from "../util/PostSkeleton";
// Material UI core imports
import Grid from "@material-ui/core/Grid";

export class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkUp = !loading ? (
      posts.map(post => <Post key={post.postId} post={post} />)
    ) : (
      <PostSkeleton />
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});
export default connect(mapStateToProps, { getPosts })(home);
