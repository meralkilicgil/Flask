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
import UserActions from "./../UserActions/UserActions";

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

  componentDidMount();
  window.location.hash = "";
 

  var topArtistList = JSON.parse(window.localStorage.getItem("artistList"));
  var profilePic = JSON.parse(window.localStorage.getItem("profilePic"));
 
 
  let urlkey = `http://localhost:5000/create`;
  return (
    <div className="MakeSimilar">
     {/*  <img class="user-avatar rounded-circle mr-2" src={profilePic} alt="User Avatar" /> */}
     <h2 className="mainsimilar-title">Create <span className="thin">Playlist</span></h2>
      <div className="columnsimilar sidesimilar">
        <h4 className="subsimilar-title">Create your playlist with: </h4>
        <InputGroup className="mb-3 input-similar">
          <FormSelect onChange={handleChange}>
            <option value='0'>Choose Playlist Credentials</option>
            <option value='1'>Similar to a song</option>
            <option value='2'>Based on an artist</option>
            <option value='3'>Based on a country</option>
            <option value='4'>Based on a music genre</option>
          </FormSelect>
        </InputGroup>
      </div>
      <div className="columnsimilar middlesimilar">
        {(() => {
          switch (tab.value) {
            case '0':
            case '1':
              urlkey = `http://localhost:5000/create`
              return (
                <form action={urlkey} method="post">
                  <h4 className="subsimilar-title">Create with similar to a song of an artist </h4>
                  <FormLabel>Artist  </FormLabel><FormControl autoFocus type="text" name="artist" className="input-label"></FormControl>
                  <FormLabel>Song </FormLabel><FormControl autoFocus type="text" name="track" className="input-label"></FormControl>
                  <FormLabel>Count </FormLabel><FormControl autoFocus type="text" name="count" className="input-label"></FormControl>
                  <FormLabel>Playlist Name </FormLabel><FormControl autoFocus type="text" name="plName" className="input-label"></FormControl>
                  <Button block type="submit">Create </Button>
                </form>
              );
              break;
            case '2':
              urlkey = `http://localhost:5000/toptracks_artist`
              return (
                <div className="artist">
                  <form action={urlkey} method="post">
                    <h4 className="subsimilar-title">Create with top songs of an artist</h4>
                    <FormLabel>Artist </FormLabel><FormControl autoFocus type="text" name="artist" className="label"></FormControl>
                    <FormLabel>Count  </FormLabel><FormControl autoFocus type="text" name="count" className="label"></FormControl>
                    <FormLabel>Playlist Name  </FormLabel><FormControl autoFocus type="text" name="plName" className="label"></FormControl>
                    <Button block type="submit">Create </Button>
                  </form>
                </div>
              );
              break;
            case '3':
              urlkey = `http://localhost:5000/toptracks_country`
              return (
                <div className="country">
                  <form action={urlkey} method="post">
                    <h4 class="subsimilar-title">Create with top songs of a country</h4>
                    <FormLabel>Country</FormLabel><FormControl autoFocus type="text" name="country" className="label"></FormControl>
                    <FormLabel>Count </FormLabel><FormControl autoFocus type="text" name="count" className="label"></FormControl>
                    <FormLabel>Playlist Name </FormLabel><FormControl autoFocus type="text" name="plName" className="label"></FormControl>
                    <Button block type="submit">Create </Button>
                  </form>
                </div>
              );
              break;
            case '4':
              urlkey = `http://localhost:5000/toptracks_tag`
              return (
                <div className="tag">
                  <form action={urlkey} method="post">
                    <h4 class="subsimilar-title">Create with top songs of a music genre</h4>
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