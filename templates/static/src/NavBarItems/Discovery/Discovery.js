import React, { useState } from "react";
import "./Discovery.css";
import Button from "react-bootstrap/Button";
//import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from "mdbreact";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect
} from "shards-react";

import Track from "./Track/Track";
import Success from "../Success/Success"

class Discovery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '0',
      parentValue: 'byTag'
    };
    this.urlkey = "";
    this.handleChange = this.handleChange.bind(this);
    this.handleByValue = this.handleByValue.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
    this.urlkey = `http://localhost:5000/discover${this.state.value}`;
    console.log(this.urlkey);
  }

  handleByValue(e) {
    this.setState({
      parentValue: e.target.value
    });
  }
  render() {
    return (
      <div className="Discovery">
        <h1>Discovery</h1>
        <div className="tabsSelection menubar">
        <ul className="menu">
          <li className="menuitem"><Button value="byTag" onClick={this.handleByValue}>Tag</Button></li>
          <li className="menuitem"><Button value="byArtist" onClick={this.handleByValue}>Artist</Button></li>
          <li className="menuitem"><Button value="byCountry" onClick={this.handleByValue}>Country</Button></li>
          <li className="menuitem"><Button value="TagInfo" onClick={this.handleByValue}>Get Info</Button></li>
        </ul>
        </div>

        <div className="byValueSelection">
          {(() => {
            switch (this.state.parentValue) {
              case 'byTag':
                return (
                  <div>
                    <div className="selection">
                      <h4>Filter by Tag</h4>
                      <InputGroup className="mb-3">
                        <FormSelect onChange={this.handleChange}>
                          <option value='0'>Choose Discover Type</option>
                          <option value='AlbumByTag'>Show top albums by tag</option>
                          <option value='TrackByTag'>Show top tracks by tag</option>
                          <option value='ArtistByTag'>Show Top Artists By Tag</option>
                          <option value='ShowRandomTag'>Show Random Tag</option>
                        </FormSelect>
                      </InputGroup>
                      <form action={`http://localhost:5000/discover${this.state.value}`} method="post">
                        <FormLabel>Tag <FormControl autoFocus type="text" name="tag"></FormControl> </FormLabel>
                        <FormLabel>Count <FormControl autoFocus type="text" name="count"></FormControl></FormLabel>
                        <Button block type="submit" className="submitDiscovery">Show </Button>
                      </form>
                    </div>
                  </div>
                );
                break;
              case 'byArtist':
                return (
                  <div>
                    <div className="selection">
                      <h4>Filter By Artist</h4>
                      <InputGroup className="mb-3">
                        <FormSelect onChange={this.handleChange}>
                          <option value='0'>Choose Discover Type</option>
                          <option value="TopArtists">Show Top Artists</option>
                          <option value='TagByArtist'>Show Top Tags By Artist</option>
                          <option value='TrackByArtist'>Show Top Tracks By Artist</option>
                        </FormSelect>
                      </InputGroup>
                      <form action={`http://localhost:5000/discover${this.state.value}`} method="post">
                        <FormLabel>Artist <FormControl autoFocus type="text" name="artist"></FormControl> </FormLabel>
                        <FormLabel>Count <FormControl autoFocus type="text" name="count"></FormControl></FormLabel>
                        <Button block type="submit" className="submitDiscovery">Show </Button>
                      </form>
                    </div>
                  </div>
                );
                break;
              case 'byCountry':
                return (
                  <div>
                    <div className="selection">
                      <h4>Filter By Country</h4>
                      <InputGroup className="mb-3">
                        <FormSelect onChange={this.handleChange}>
                          <option value='0'>Choose Discover Type</option>
                          <option value="TracksByCountry">Show Top Tracks By Country</option>
                          <option value='ArtistByCountry'>Show Top Artists By Country</option>
                        </FormSelect>
                      </InputGroup>
                      <form action={`http://localhost:5000/discover${this.state.value}`} method="post">
                        <FormLabel>Country <FormControl autoFocus type="text" name="country"></FormControl> </FormLabel>
                        <Button block type="submit" className="submitDiscovery">Show </Button>
                      </form>
                    </div>
                  </div>
                );
                break;
              case 'TagInfo':
                return (
                  <div>
                    <div className="selection">
                      <h4>Get info about tag</h4>
                      <form action={`http://localhost:5000/discover${this.state.parentValue}`} method="post">
                        <FormLabel>Tag <FormControl autoFocus type="text" name="tag"></FormControl> </FormLabel>
                        <Button block type="submit" className="submitDiscovery">Show </Button>
                      </form>
                    </div>
                  </div>
                );
            }
          })()}

        </div>
      </div>
    );
  }
}
export default Discovery;