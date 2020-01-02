import React from "react";
import { Link } from "react-router-dom";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse,
    NavItem,
    NavLink
} from "shards-react";
import Button from "react-bootstrap/Button";
import MakeSimilar from "./../MakeSimilar/MakeSimilar";

export default class UserActions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
        
        this.signout = this.signout.bind(this);
        this.toggleUserActions = this.toggleUserActions.bind(this);
    }

    toggleUserActions() {
        this.setState({
            visible: !this.state.visible
        });
    }
    signout(){
        this.MakeSimilar.logout();
    }
    profilePic = JSON.parse(window.localStorage.getItem("profilePic"));
    userName = JSON.parse(window.localStorage.getItem("userName"));
  
    render() {
        return (
            <div className="menu">
                <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
                    <DropdownToggle caret tag={NavLink} className="text-nowrap px-1">
                        <img className="user-avatar rounded-circle profile" src={this.profilePic} alt="User Avatar" />{" "}
                        <span className="d-none d-md-inline-block">{this.userName}</span>
                    </DropdownToggle>
                    <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                        <DropdownItem divider />
                        <DropdownItem tag={Button} onClick={this.signout} className="text-danger">
                            <i className="material-icons text-danger">&#xE879;</i> Logout
                        </DropdownItem>
                    </Collapse>
                </NavItem>
            </div>
        );
    }
}
