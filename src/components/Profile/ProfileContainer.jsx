import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {getProfile, getStatus, updateStatus} from '../../redux/profile-reducer';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
    }
    this.props.getProfile(userId);
    this.props.getStatus(userId);
    
    // usersAPI.getProfile(userId).then(data => {
    //         this.props.setUserProfile(data);
    //     });
  }

  render () {
    return (
      <Profile {...this.props} 
      profile={this.props.profile} 
      status={this.props.status}
      updateStatus={this.props.updateStatus} />
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
})

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
let withRouter = (Component) => {
  let ComponentWithRouterProp = (props) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
          <Component
              {...props}
              router={{ location, navigate, params }}
          />
      );
  }

  return ComponentWithRouterProp;
}

export default compose (
  connect (mapStateToProps, {getProfile, getStatus, updateStatus}),
  withRouter,
  withAuthRedirect
) (ProfileContainer);