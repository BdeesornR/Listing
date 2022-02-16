import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";

import TeamList from "../TeamList/TeamList";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import * as actions from "../../store/actions";
import "./UserList.css";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.userList = [
      { id: 1, title: "Team Red", cssName: "team_red" },
      { id: 2, title: "Team Blue", cssName: "team_blue" },
      { id: 3, title: "Team Yellow", cssName: "team_yellow" },
    ];
  }

  render() {
    const neuBox = this.props.users.filter((user) => user.affiliation == null);

    const neuBoxStatus = neuBox.length !== 0;

    const forRender = (
      <div className="content_box">
        {neuBox.map((user) => (
          <div
            className="user_box"
            onClick={() => this.props.removeUser(user.id)}
          >
            <div className="no_team"></div>
            <p>{user.dataInfo}</p>
          </div>
        ))}
      </div>
    );

    return (
      <Aux>
        <div>
          <p className="headline">User List</p>
          <section className="user_list">
            {this.userList.map((teamList) => {
              return (
                <Link
                  className="team_list"
                  key={teamList.id}
                  to={{
                    pathname: "/user_list/" + teamList.id,
                    // search: "?teamList_cssName=" + teamList.cssName,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {teamList.title}
                    <div className={teamList.cssName}></div>
                  </div>
                </Link>
              );
            })}
          </section>
          <p
            style={{
              fontSize: "1vh",
              color: "grey",
              cursor: "default",
              margin: "unset",
            }}
          >
            click the name to remove user
          </p>
          {neuBoxStatus ? forRender : null}
        </div>

        <Route path="/user_list/:id" component={TeamList} />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  removeUser: (id) =>
    dispatch({ type: actions.REMOVE_USER, payload: { id: id } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
