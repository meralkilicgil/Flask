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
      value: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
      this.setState({
        value: e.target.value
      });
    console.log(this.state.value);
  }
  render() {
    return (
      <div className="Discovery">
        <div className="selection">
            <h1>Select what you want to discover</h1>          
              <InputGroup className="mb-3">
                <FormSelect onChange={this.handleChange}>
                <option value='0'>Choose</option>
                <option value='1'>Show top albums by tag</option>
                <option value='2'>Show top tracks by tag</option>
                </FormSelect>
              </InputGroup>
        </div>
        <div className="tabs">
        {(() => {
            switch (this.state.value) {
              case '1':
                return (
                  <div className="topAlbumsTag">
                    <form action="http://localhost:5000/discoverAlbums" method="post">
                    <h2>Show Top albums by Tag </h2>
                    <FormLabel>Tag <FormControl autoFocus type="text" name="tag"></FormControl> </FormLabel>
                    <FormLabel>Count <FormControl autoFocus type="text" name="count"></FormControl></FormLabel>
                    <Button block type="submit">Create </Button>
                  </form>
                  </div>
                );
              case '2':
                return <p> invalid </p>;
              default:
                return null;
            }
          })()}
          {/* {(this.state.value == "1") ? <Track /> : <Success/>} */}
        </div>       
      </div>
    );
  }
}
export default Discovery;