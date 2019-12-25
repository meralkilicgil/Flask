import React, { useState } from "react";
import "./TopTracks.css";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import Artist from "./Artist/Artist";
import Country from "./Country/Country";
import Tag from "./Tag/Tag";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormSelect
  } from "shards-react";

class TopTracks extends React.Component {

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
            <div className="TopTracks">
                <div className="selection">
                    <form action="http://localhost:5000/discovery" method="post">
                        <h1>Select Top Type</h1>
                        <InputGroup className="mb-3">
                            <FormSelect onChange={this.handleChange}>
                                <option value='0'>Choose Top Type</option>
                                <option value='1'>Artist</option>
                                <option value='2'>Country</option>
                                <option value='3'>Tag</option>
                            </FormSelect>
                        </InputGroup>
                    </form>
                </div>
                <div className="tabs">
                    {(() => {
                        switch (this.state.value) {
                            case '1':
                                return <Artist />;
                            case '2':
                                return <Country />;
                            case '3':
                                return <Tag/>;
                            default:
                                return null;
                        }
                    })()}
                </div>               
            </div>
        );
    }
}
export default TopTracks;
