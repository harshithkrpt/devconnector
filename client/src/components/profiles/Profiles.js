import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

import { getprofiles } from "../../actions/profileActions";
import Profile from "./ProfileItem";

class Profiles extends Component {
  static propTypes = {
    getprofiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getprofiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else if (profiles.length > 0) {
      profileItems = profiles.map(profile => (
        <Profile key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h4>No Profiles Found...</h4>;
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and Connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getprofiles }
)(Profiles);
