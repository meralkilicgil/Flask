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
import './MakeSimilar.css';
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import Artist from "./../TopTracks/Artist/Artist";
import Country from "./../TopTracks/Country/Country";
import Tag from "./../TopTracks/Tag/Tag";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect
} from "shards-react";

const fs = require('fs')


const MakeSimilar = ({ smallStats }) => {

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
  }

  componentDidMount();
  window.location.hash = "";
  console.log(`Token before ${token}`)
  useEffect(() => {
    getData(token);
  })

  console.log(2)
  let urlkey = `http://localhost:5000/create?${usernameToken}?${token}`
  return (
    <div className="MakeSimilar">
        <h3>Create Playlist</h3>
        <div className="selection column side">
          <h4>Create your playlist based on: </h4>
          <InputGroup className="mb-3">
            <FormSelect onChange={handleChange}>
              <option value='0' className="credential">Choose Playlist Credentials</option>
              <option value='1' className="credential">Songs of artists</option>
              <option value='2' className="credential">Artist</option>
              <option value='3' className="credential">Country</option>
              <option value='4' className="credential">Tag</option>
            </FormSelect>
          </InputGroup>
        </div>
        <div className="tabs column middle">
          {(() => {
            switch (tab.value) {
              case '0':
              case '1':
                urlkey = `http://localhost:5000/create?${usernameToken}?${token}`
                return (
                  <form action={urlkey} method="post">
                    <h4>Create Similar Playlist </h4>
                    <FormLabel>Artist  </FormLabel><FormControl autoFocus type="text" name="artist" className="label"></FormControl>
                    <FormLabel>Song </FormLabel><FormControl autoFocus type="text" name="track" className="label"></FormControl>
                    <FormLabel>Count </FormLabel><FormControl autoFocus type="text" name="count" className="label"></FormControl>
                    <FormLabel>Playlist Name </FormLabel><FormControl autoFocus type="text" name="plName" className="label"></FormControl>
                    <Button block type="submit">Create </Button>
                  </form>
                );
                break;
              case '2':
                urlkey = `http://localhost:5000/toptracks_artist?${usernameToken}?${token}`
                return (
                  <div className="artist">
                    <form action={urlkey} method="post">
                      <h4>Top Tracks of Artist</h4>
                      <FormLabel>Artist </FormLabel><FormControl autoFocus type="text" name="artist" className="label"></FormControl>
                      <FormLabel>Count  </FormLabel><FormControl autoFocus type="text" name="count" className="label"></FormControl>
                      <FormLabel>Playlist Name  </FormLabel><FormControl autoFocus type="text" name="plName" className="label"></FormControl>
                      <Button block type="submit">Create </Button>
                    </form>
                  </div>
                );
                break;
              case '3':
                urlkey = `http://localhost:5000/toptracks_country?${usernameToken}?${token}`
                return (
                  <div className="country">
                    <form action={urlkey} method="post">
                      <h4>Country Top Tracks</h4>
                      <FormLabel>Country</FormLabel><FormControl autoFocus type="text" name="country" className="label"></FormControl>
                      <FormLabel>Count </FormLabel><FormControl autoFocus type="text" name="count" className="label"></FormControl>
                      <FormLabel>Playlist Name </FormLabel><FormControl autoFocus type="text" name="plName" className="label"></FormControl>
                      <Button block type="submit">Create </Button>
                    </form>
                  </div>
                );
                break;
              case '4':
                urlkey = `http://localhost:5000/toptracks_tag?${usernameToken}?${token}`
                return (
                  <div className="tag">
                    <form action={urlkey} method="post">
                      <h4>Top Tracks of Taf</h4>
                      <FormLabel>Tag</FormLabel><FormControl autoFocus type="text" name="tag" className="label"></FormControl>
                      <FormLabel>Count </FormLabel><FormControl autoFocus type="text" name="count" className="label"></FormControl>
                      <FormLabel>Playlist Name </FormLabel><FormControl autoFocus type="text" name="plName" className="label"></FormControl>
                      <Button block type="submit">Create </Button>
                    </form>
                  </div>
                );
                break;
              default:
                return null;
            }
          })()}
        </div>
    </div>
  );
}
export default MakeSimilar;