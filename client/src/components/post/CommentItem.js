import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deletecomment } from "../../actions/postActions";

export class CommentItem extends Component {
  static propTypes = {
    deletecomment: PropTypes.func.isRequired,
    comment: PropTypes.object,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
  };

  onDeleteClick(postId, commentId) {
    this.props.deletecomment(postId, commentId);
  }
  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletecomment }
)(CommentItem);
