import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./Sidebar.css";
// import UserPanel from "../UserPanel/UserPanel";

import Taco from "../../components/api/taco";

type acceptedProps = {
  token: any;
  updateUsername: any;
  protectedViews: any;
  protectedViewsAdmin: any;
  protectedViewsTrails: any;
  protectedViewsShops: any;
  clearToken: any;
};

export default class Sidebar extends React.Component<acceptedProps, {}> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {};
  }

  adminPortal() {
    if (localStorage.getItem("userRole") === "Admin") {
      return (
        <li className="nav-item">
          <Link to="/AdminPanel" className="nav-link">
            <span className="link-text">Admin</span>
          </Link>
        </li>
      );
    }
  }

  render() {
    return (
      <>
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <span className="link-text">Home</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/AdminPanel" className="nav-link">
                <span className="link-text">Admin</span>
              </Link>
            </li> */}
            {this.adminPortal()}
            <li className="nav-item">
              <Link to="/times" className="nav-link">
                <span className="link-text">Trail Times</span>
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link to="/UserPanel" className="nav-link">
                <span className="link-text">User</span>
              </Link>
            </li> */}

            <li className="nav-item">
              <Link to="/Shops" className="nav-link">
                <span className="link-text">Bike Shops</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Taco" className="nav-link">
                <span className="link-text">Let's Taco</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-route">
          <Switch>
            <Route exact path="/">
              {this.props.protectedViewsTrails()}
            </Route>
            <Route exact path="/times">
              {this.props.protectedViews()}
            </Route>
            <Route exact path="/AdminPanel">
              {this.props.protectedViewsAdmin()}
            </Route>

            {/* <Route exact path="/UserPanel">
              <UserPanel
                token={this.props.token}
                updateUsername={this.props.updateUsername}
              />
            </Route> */}

            <Route exact path="/Shops">
              {this.props.protectedViewsShops()}
              {/* <ShopIndex
                token={this.props.token}
                updateUsername={this.props.updateUsername}
              /> */}
            </Route>
            <Route exact path="/Taco">
              <Taco />
            </Route>
          </Switch>
        </div>
        {/* </div> */}
      </>
    );
  }
}
