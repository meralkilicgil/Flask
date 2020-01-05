import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Form } from "shards-react";
import axios from "axios";

import PageTitle from "../../components/common/PageTitle";
import SmallStats from "../../components/common/SmallStats";
import UsersOverview from "../../components/blog/UsersOverview";
import UsersByDevice from "../../components/blog/UsersByDevice";
import NewDraft from "../../components/blog/NewDraft";
import Discussions from "../../components/blog/Discussions";
import TopReferrals from "../../components/common/TopReferrals";
import './FeelLucky.css';
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormSelect
} from "shards-react";

const fs = require('fs')


const FeelLucky = ({ smallStats }) => {

    let first = 0;
    const [token, setToken] = useState("");
    const [usernameToken, setUserNameToken] = useState("");
    const [successData, setState] = useState({
        name: "",
        popularity: ""
    })
    const [currentData, setCurrentData] = useState({});
    const [tab, setTab] = useState({
        value: '1'
    });

    const componentDidMount = () => {
        // Set token
        let _token = hash.access_token;
        if (_token) {
            // Set token
            setToken(_token);
        }
    }
    const handleChange = (e) => {
        setTab({
            value: e.target.value
        });
    }
    const hash = window.location.hash
        .substring(1)
        .split("&")
        .reduce(function (initial, item) {
            if (item) {
                var parts = item.split("=");
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});

    /* const getData = (token) => {
        console.log(token);
        axios.interceptors.request.use(function (config) {
            // Do something before request is sent

            config.headers["Authorization"] = `Bearer ${token}`;
            console.log(config)
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
        axios.get("https://api.spotify.com/v1/me/")
            .then((data) => {
                first = data.data.display_name;
                //window.location.href = `http://localhost:3000/callback?${data.data.display_name}?${token}`;

                setUserNameToken(data.data.display_name)
                //setState({
                //...successData,
                //[data.data.items.name ] : data.data.items.popularity
                //});
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(successData);
    } */

    componentDidMount();
    window.location.hash = "";
 

    console.log(2)
    let urlkey = `http://localhost:5000/feellucky`;
    return (
        <div className="FeelLucky">
            <div className="column side">
            <h1 className="mainlucky-title">Create Random <span className="thin"> playlist</span></h1>
            <InputGroup className="mb-3 lucky-input">
            <FormSelect onChange={handleChange}>
              <option value='0' className="credential">Choose Random Type</option>
              <option value='1' className="credential">Tag</option>
              <option value='2' className="credential">Artist</option>
              <option value='3' className="credential">Country</option>
            </FormSelect>
          </InputGroup>
          {(() => {
            switch (tab.value) {
              case '0':
              case '1':
                urlkey = `http://localhost:5000/feellucky_tag`
                return (
                  <form action={urlkey} method="post">
                    <Button block type="submit" className="submitLucky">Create </Button>
                  </form>
                );
                break;
              case '2':
                urlkey = `http://localhost:5000/feellucky_artist`
                return (
                  <div className="artist">
                    <form action={urlkey} method="post">
                      <Button block type="submit" className="submitLucky">Create </Button>
                    </form>
                  </div>
                );
                break;
              case '3':
                urlkey = `http://localhost:5000/feellucky_country`
                return (
                  <div className="country">
                    <form action={urlkey} method="post">
                      <Button block type="submit" className="submitLucky">Create </Button>
                    </form>
                  </div>
                );
                break;
              default:
                return null;
            }
          })()}</div>
        </div>
    );
}
export default FeelLucky;