import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.less";
import "./App.css";
// import {} from "@types/styled-components/cssprop";

import { BrowserRouter as Router } from "react-router-dom";

import Auth from "./auth/Auth";
import TimeIndex from "./times/timeIndex";
import Sidebar from "./components/site/Sidebar";
import Navbar from "./home/Navbar";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import TrailIndex from "./trails/trailIndex";
import ShopIndex from "./shops/shopIndex";

type valueTypes = {
  username: any;
  setUsername: any;
  setToken: any;
  setUserRole: string | any;
  setMessage: string | any;
};

export default class App extends React.Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props);
    this.state = {
      username: "",
      setUsername: "",
      setToken: "",
      setUserRole: "",
      setMessage: "",
    };
  }

  componentWillMount() {
    console.log("Mounted");
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ setToken: localStorage.getItem("token") });
    }

    if (localStorage.getItem("username")) {
      this.setState({ setUsername: localStorage.getItem("username") });
    }
    if (localStorage.getItem("userRole")) {
      this.setState({ setUserRole: localStorage.getItem("userRole") });
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({ setToken: newToken });
    console.log(this.state.setToken);
  };

  updateUsername = (newUsername: string) => {
    localStorage.setItem("username", newUsername);
    this.setState({ setUsername: newUsername });
    console.log(newUsername);
  };

  updateUserRole = (newUserRole: string) => {
    localStorage.setItem("userRole", newUserRole);
    this.setState({ setUserRole: newUserRole });
    console.log(this.state.setUserRole);
  };

  updatedMessage = (newMessage: string) => {
    localStorage.setItem("message", newMessage);
    this.setState({ setMessage: newMessage });
    console.log(newMessage);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ setUserRole: "", setUsername: "", setMessage: "" });
  };

  protectedViews = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
      <TimeIndex
        token={this.state.setToken}
        updateUsername={this.updateUsername}
      />
    ) : (
      <Auth
        token={this.updateToken}
        updateUsername={this.updateUsername}
        updateUserRole={this.updateUserRole}
        updateMessage={this.updatedMessage}
      />
    );
  };

  protectedViewsTrails = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
      <TrailIndex
        token={this.state.setToken}
        updateUsername={this.updateUsername}
      />
    ) : (
      <Auth
        token={this.updateToken}
        updateUsername={this.updateUsername}
        updateUserRole={this.updateUserRole}
        updateMessage={this.updatedMessage}
      />
    );
  };

  protectedViewsShops = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
      <ShopIndex
        token={this.state.setToken}
        updateUsername={this.updateUsername}
      />
    ) : (
      <Auth
        token={this.updateToken}
        updateUsername={this.updateUsername}
        updateUserRole={this.updateUserRole}
        updateMessage={this.updatedMessage}
      />
    );
  };

  protectedViewsAdmin = () => {
    return localStorage.getItem("userRole") === "Admin" ? (
      <AdminPanel
        token={this.updateToken}
        updateUsername={this.updateUsername}
        updateUserRole={this.updateUserRole}
      />
    ) : (
      <Auth
        token={this.updateToken}
        updateUsername={this.updateUsername}
        updateUserRole={this.updateUserRole}
        updateMessage={this.updatedMessage}
      />
    );
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar clearToken={this.clearToken} />
          <Sidebar
            protectedViews={this.protectedViews}
            protectedViewsTrails={this.protectedViewsTrails}
            protectedViewsShops={this.protectedViewsShops}
            protectedViewsAdmin={this.protectedViewsAdmin}
            token={this.state.setToken}
            updateUsername={this.updateUsername}
            clearToken={this.clearToken}
          />
        </Router>
      </div>
    );
  }
}

{
  /* <Auth
token={this.state.setToken}
updateUsername={this.updateUsername}
/>
<TimeIndex
token={this.state.setToken}
updateUsername={this.updateUsername}
/> */
}
