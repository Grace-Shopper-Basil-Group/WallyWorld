import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/users';

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div>
        <div>
          <h1> All Users</h1>
        </div>
        <div>
          {this.props.users.map((user) => {
            return (
              <div key={user.id}>
                <a href={`/users/${user.id}`}>
                  {`${user.firstName + ' ' + user.lastName}`}
                </a>
                <div>{user.username}</div>
                <div>{user.password}</div>
                <div>{user.email}</div>
                <div>{user.accessRights}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { users: state.users };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
