import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./TeamList.css";

class TeamList extends Component {
  // state = {
  //   cssName: null,
  //   id: null,
  // };

  constructor(props) {
    super(props);
    this.affInfo = [
      { id: 1, cssName: "team_red" },
      { id: 2, cssName: "team_blue" },
      { id: 3, cssName: "team_yellow" },
    ];
  }

  // updateData = () => {
  //   const teamList_cssName = new URLSearchParams(this.props.location.search);
  //   for (let params of teamList_cssName.entries()) {
  //     this.setState({ cssName: params[1] });
  //   }

  //   const teamList_id = this.props.match.params.id;
  //   this.setState({ id: +teamList_id });
  // };

  // componentDidMount() {
  //   this.updateData();
  //   console.log(+this.props.match.params.id, this.props.match.params.id);
  // }

  // shouldComponentUpdate(nextprops) {
  //   // if (this.state.id !== +nextprops.match.params.id) {
  //   // this.updateData();
  //   if (+this.props.match.params.id !== +nextprops.match.params.id) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const affBox = this.props.users.filter(
      (user) =>
        user.affiliation ===
        this.affInfo[+this.props.match.params.id - 1].cssName
    );

    const affBoxStatus = affBox.length !== 0;

    const forRender = (
      <div className="content_box">
        {affBox.map((user) => (
          <div
            className="user_box"
            onClick={() => this.props.removeUser(user.id)}
          >
            <div
              className={this.affInfo[+this.props.match.params.id - 1].cssName}
            ></div>
            <p>{user.dataInfo}</p>
          </div>
        ))}
      </div>
    );

    return this.props.match.params.id && affBoxStatus ? forRender : null;
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  removeUser: (id) =>
    dispatch({ type: actions.REMOVE_USER, payload: { id: id } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
