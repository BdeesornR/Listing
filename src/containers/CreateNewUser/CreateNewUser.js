import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import DelCharButton from "../../components/DelCharButton/DelCharButton";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import styling from "./CreateNewUser.module.css";

class CreateNewUser extends Component {
  state = {
    data: { dataInfo: "New User", textLength: 8, affiliation: null, id: 1 },
  };

  componentDidMount() {
    if (this.props.curMaxIDValue !== 0) {
      const tempData = { ...this.state.data };
      tempData.id = this.props.curMaxIDValue + 1;
      this.setState({ data: tempData });
    }
  }

  charCountHandler = (data, dataID) => {
    // to modify state's data by typing
    const tempInfo = { ...this.state.data };
    const tempData = data.target.value;
    tempInfo.dataInfo = tempData;
    tempInfo.textLength = tempData.length;
    this.setState({ data: tempInfo });
  };

  setStateHandler = (data, dataID) => {
    // to modify (erase) state's data by clicking
    const tempInfo = { ...this.state.data };
    tempInfo.dataInfo = data;
    tempInfo.textLength = data.length;
    this.setState({ data: tempInfo });
  };

  setAffHandler = (cssName) => {
    const tempData = { ...this.state.data };
    tempData.affiliation = cssName;
    this.setState({ data: tempData });
  };

  addUserHandler = (data) => {
    this.props.addUser(data);
    const tempData = { ...this.state.data };
    tempData.id = this.state.data.id + 1;
    this.setState({ data: tempData });
  };

  render() {
    const tempData = this.state.data;

    return (
      <Aux>
        <p className={styling.headline}>Create New User</p>

        <div className={styling.register_card}>
          <DelCharButton
            material={tempData.dataInfo}
            pass={tempData.id}
            func={(passedData) => this.setStateHandler(passedData, tempData.id)}
          />

          <p
            style={{
              fontSize: "1vh",
              color: "grey",
              cursor: "default",
              marginBottom: "0px",
            }}
          >
            click the alphabet to remove the character
          </p>

          <p style={{ cursor: "default", marginTop: "14px" }}>
            User's name has {tempData.textLength} characters.
          </p>

          <input
            type="text"
            className={styling.text_input}
            onChange={(event) => this.charCountHandler(event, tempData.id)}
            value={tempData.dataInfo}
          ></input>

          <div className={styling.affiliation_box}>
            <p style={{ cursor: "default" }}>Affiliation :</p>
            <div
              className={`${styling.team_red} ${
                this.state.data.affiliation === "team_red"
                  ? styling.div_active
                  : ""
              }`}
              onClick={() => this.setAffHandler("team_red")}
            ></div>
            <div
              className={`${styling.team_blue} ${
                this.state.data.affiliation === "team_blue"
                  ? styling.div_active
                  : ""
              }`}
              onClick={() => this.setAffHandler("team_blue")}
            ></div>
            <div
              className={`${styling.team_yellow} ${
                this.state.data.affiliation === "team_yellow"
                  ? styling.div_active
                  : ""
              }`}
              onClick={() => this.setAffHandler("team_yellow")}
            ></div>
          </div>

          <button
            className={styling.btn_add}
            onClick={() => this.addUserHandler(this.state.data)}
          >
            Add User
          </button>
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  curMaxIDValue: state.curMaxIDValue,
});

const mapDispatchToProps = (dispatch) => ({
  addUser: (object) =>
    dispatch({ type: actions.ADD_USER, payload: { ...object } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewUser);
