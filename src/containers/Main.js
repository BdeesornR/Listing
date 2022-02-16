import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import CreateNewUser from "./CreateNewUser/CreateNewUser";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Aux from "../hoc/Auxiliary/Auxiliary";
import lazy from "../hoc/lazy/lazy";
import "./Main.css";

const AsyncList = lazy(() => import("../components/UserList/UserList"));

class Main extends Component {
  render() {
    return (
      <Aux>
        <div className="btn_div">
          <Link to="/create_new_user" className="btn">
            Create New User
          </Link>
          <Link to="/user_list" className="btn">
            User List
          </Link>
        </div>
        <Switch>
          <Route path="/user_list" component={AsyncList} />
          <Route path="/create_new_user" component={CreateNewUser} />
          <Redirect from="/" exact to="/create_new_user" />
          <Route component={ErrorPage} />
        </Switch>
      </Aux>
    );
  }
}

export default Main;
