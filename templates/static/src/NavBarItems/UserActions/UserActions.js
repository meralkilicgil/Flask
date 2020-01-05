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

export default class UserActions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            pictureOfProfile: "",
            nameOfProfile: ""
        };

        this.signout = this.signout.bind(this);
        this.toggleUserActions = this.toggleUserActions.bind(this);
    }

    toggleUserActions() {
        this.setState({
            visible: !this.state.visible
        });
    }

    profilePic = JSON.parse(window.localStorage.getItem("profilePic"));
    userName = JSON.parse(window.localStorage.getItem("userName"));

    componentDidMount(profilePic, userName) {
        this.setState({
            pictureOfProfile: profilePic,
            nameOfProfile: userName
        });
    }
    signout() {
        const url = 'https://accounts.spotify.com/en/logout/'
        const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
        setTimeout(() => spotifyLogoutWindow.close(), 900)
        window.localStorage.clear();
        this.profilePic = ""
        this.userName = ""
        this.componentDidMount(this.profilePic, this.userName);
        setTimeout(function () {
            window.location.href = `http://localhost:3000`;
        }, 2000);
    }

    validateLogin() {
        return this.profilePic != null || this.userName != null;
    }
    render() {
        return (
            <div className="menu">
                <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
                    <DropdownToggle caret tag={NavLink} className="text-nowrap px-1">
                        <img className="user-avatar rounded-circle profile" src={this.profilePic} alt="User Avatar" />{" "}
                        <span className="d-none d-md-inline-block">{this.userName}</span>
                    </DropdownToggle>
                    <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                        <DropdownItem tag={Button}  onClick={ () =>{ 
                            if( this.validateLogin()){
                                this.signout();
                            }else{

                            }
                        }} className="text-danger">
                            <i className="material-icons text-danger">&#xE879;</i> Logout
                        </DropdownItem>
                    </Collapse>
                </NavItem>
            </div>
        );
    }
}
