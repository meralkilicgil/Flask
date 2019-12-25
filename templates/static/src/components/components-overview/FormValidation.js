import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Row,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  FormInput,
  FormSelect,
  Button
} from "shards-react";

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const FormValidation = ( props ) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const  [token, setToken] = useState("");

  const clientId = "6462e55abfd5435ba392959529e6c1a7";
  const redirectUri = "http:%2F%2Flocalhost:3000%2Fblog-overview%2F";
  const scopes = [
    "playlist-read-private",
    "playlist-modify-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "user-library-read",
    "user-library-modify",
    "user-top-read",
    "user-read-recently-played"
  ];

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

  componentDidMount();
  window.location.hash = "";

  function validateForm() {
    return validateEmail(email) && password.length > 0;
  }

  const isItAValidAccount = () => {
    return "blog-overview";
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  
  return (<Col sm="12" md="20">
    <strong className="text-muted d-block mb-2">Credential Check</strong>
    <Form>
      
      { !token &&
      <Button block bsSize="large" disabled={ validateForm() } type="submit"  href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}  >
          Login
      </Button>
      }
      {
        token
      }
    </Form>
  </Col>
)};

export default FormValidation;
