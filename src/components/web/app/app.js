import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddWord from '../containers/AddWord/AddWord';
import WordList from '../containers/WordList/WordList';
import TotalPoints from '../containers/TotalPoints/TotalPoints';
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from './app.less';
import bulls from './bulls.png';
import cows from './cows.png';
import Login from '../login/login';
import { Loader } from '../presentational/Loader/Loader';
import { toggleLogin } from '../../../actions/login/loginActions';
import { toggleLoading } from '../../../actions/loading/loadingActions';
import { saveUser } from '../../../actions/user/userActions';
import { getDetails } from '../../../actions/details/detailsActions';
import { getUsers } from '../../../actions/users/usersActions';

class App extends Component {
  render() {
    const { login, loading, toggleLogin, toggleLoading, saveUser, getDetails, users, getUsers, uid } = this.props;
    return (
      <div>
        <div className='col-md-2 col-lg-3'>
        </div>
        <div className={Styles.mainBox + ' col-xs-12 col-sm-12 col-md-8 col-lg-6 ' + Styles.center}>
          {!login && <Login
            loading={loading}
            toggleLogin={toggleLogin}
            toggleLoading={toggleLoading}
            saveUser={saveUser}
            getDetails={getDetails}
            getUsers={getUsers} />}
          {login && !loading && <Board users={users} uid={uid} />}
          {loading && <Loader />}
        </div>
        <div className='col-md-2 col-lg-3'>
        </div>
      </div>
    );
  }
};

const LeaderBoard = ({ users, uid }) => {
  users.sort((a, b) => b.points - a.points);
  return (
    <div className={Styles.leaderBoard}>
      <b> LeaderBoard </b>
      <ol>
        {users.map((user, i) => {
          let bold = false;
          console.log(user);
          if (user.user === uid) bold = true;
          return (
            <li key={i} className={bold ? Styles.bold : Styles.normal}>{user.displayName.substr(0, 25)} - {user.points}</li>
          )
        }
        )}
      </ol>
    </div>
  )
};

const Board = ({ users, uid }) => (
  <div>
    <div className='col-xs-12'>
      <img className={Styles.headerImg} src={bulls} />
      <img className={Styles.headerImg} src={cows} />
      <TotalPoints />
      <AddWord />
    </div>
    <div className={'col-md-7 ' + Styles.borderTop}>
      <WordList />
    </div>
    <div className={'col-md-5 ' + Styles.borderLeft + ' ' + Styles.borderTop}>
      <LeaderBoard users={users} uid={uid} />
    </div>
    <Rules />
  </div>
);

const Rules = () => (
  <div className={Styles.borderTop + ' col-xs-12'}>
    <div className='col-sm-1'>
    </div>
    <div className='col-sm-10'>
      <h6> How to play: </h6>
      Guess the 4 letter word. All letters are different.<br />
      Right letter, wrong place is a "cow." Right letter, right place is a "bull."
    </div>
    <div className='col-sm-1'>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    login: state.login,
    loading: state.loading,
    users: state.users,
    uid: state.user.uid
  };
};

const mapDispatchToProps = (dispatch) => ({
  toggleLogin: () => dispatch(toggleLogin()),
  toggleLoading: loading => dispatch(toggleLoading(loading)),
  saveUser: data => dispatch(saveUser(data)),
  getDetails: userId => dispatch(getDetails(userId)),
  getUsers: () => dispatch(getUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
