import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Form} from "shards-react";
import axios from "axios";

import PageTitle from "../../../components/common/PageTitle";
import SmallStats from "../../../components/common/SmallStats";
import UsersOverview from "../../../components/blog/UsersOverview";
import UsersByDevice from "../../../components/blog/UsersByDevice";
import NewDraft from "../../../components/blog/NewDraft";
import Discussions from "../../../components/blog/Discussions";
import TopReferrals from "../../../components/common/TopReferrals";
import './Artist.css';
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";

const fs = require('fs') 


const Artist = ({ smallStats }) => {

  let first = 0;
  const  [token, setToken] = useState("");
  const  [usernameToken, setUserNameToken] = useState("");
  const  [successData, setState] = useState({
    name:"",
    popularity: ""
  })
  const [currentData, setCurrentData] = useState({});


  const componentDidMount = () => {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
     setToken(_token);
    }
  }

  const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

  const getData = (token) => {
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
          .then( (data) => {
              first = data.data.display_name;
              //window.location.href = `http://localhost:3000/callback?${data.data.display_name}?${token}`;
          
              setUserNameToken(data.data.display_name)
              //setState({
          //...successData,
          //[data.data.items.name ] : data.data.items.popularity
        //});
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(successData);
  }

    componentDidMount();
    window.location.hash = "";
    console.log(`Token before ${token}`)
    useEffect( () => {
      getData( token);
    })
    
    console.log(2)
const urlkey = `http://localhost:5000/toptracks_artist?${usernameToken}?${token}`
        return (
            <div className="artist">
                <form action={urlkey} method="post">
                    <h1>Top Tracks of Artist</h1>
                    <FormLabel>Artist<FormControl autoFocus type="text" name="artist"></FormControl> </FormLabel>
                    <FormLabel>Count <FormControl autoFocus type="text" name="count"></FormControl></FormLabel>
                    <FormLabel>Playlist Name <FormControl autoFocus type="text" name="plName"></FormControl></FormLabel>
                    <Button block type="submit">Create </Button>
                </form>
            </div>
        );
}
export default Artist;