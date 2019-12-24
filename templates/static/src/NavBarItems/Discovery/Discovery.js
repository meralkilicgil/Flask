import React, { useState } from "react";
import "./Discovery.css";
import Button from "react-bootstrap/Button";
//import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from "mdbreact";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";

class Discovery extends React.Component {

    constructor(props) {
        super(props);

    }
    state = {
        options: [
          {
            text: "showtopalbumsbytag",
            value: "1"
          },
          {
            text: "showsimilarartists",
            value: "2"
          },
          {
            text: "showtopartistschart",
            value: "3"
          },
          {
            text: "showtopartistsbycountry",
            value: "4"
          },
          {
            text: "showtoptrackschart",
            value: "5"
          },
          {
            text: "showtoptracksbyartist",
            value: "6"
          },
          {
            text: "showtoptracksbytag",
            value: "7"
          },
          {
            text: "showtoptagsforalbum",
            value: "8"
          },
          {
            text: "showtoptagsforartist",
            value: "9"
          },
          {
            text: "showtoptagsfortrack",
            value: "10"
          },
          {
            text: "showtoptagschart",
            value: "11"
          },
          {
            text: "showtaginfo",
            value: "12"
          },
          {
            text: "showsimilartags",
            value: "13"
          },
          {
            text: "showrandomtag",
            value: "14"
          },
          {
            text: "showtoptags",
            value: "15"
          }
        ]
    };
    render() {
        return (
            <div className="Discovery">
                <form action="http://localhost:5000/discovery" method="post">
                    <h1>Select what you want to discover</h1>
                    {/* <div>
                        <MDBSelect
                        search
                        options={this.state.options}
                        selected="Choose your option"
                        label="Example label"
                        />
                    </div>
                    <MDBSelect label="Example label">
                        <MDBSelectInput selected="Choose topic" />
                        <MDBSelectOptions>
                            <MDBSelectOption value="0">Choose topic</MDBSelectOption>
                            <MDBSelectOption value="1">showtopalbumsbytag</MDBSelectOption>
                            <MDBSelectOption value="2">showsimilarartists</MDBSelectOption>
                            <MDBSelectOption value="3">showtopartistschart</MDBSelectOption>
                            <MDBSelectOption value="4">showtopartistsbycountry</MDBSelectOption>
                            <MDBSelectOption value="5">showtoptrackschart</MDBSelectOption>
                            <MDBSelectOption value="6">showtoptracksbyartist</MDBSelectOption>
                            <MDBSelectOption value="7">showtoptracksbytag</MDBSelectOption>
                            <MDBSelectOption value="8">showtoptagsforalbum</MDBSelectOption>
                            <MDBSelectOption value="9">showtoptagsforartist</MDBSelectOption>
                            <MDBSelectOption value="10">showtoptagsfortrack</MDBSelectOption>
                            <MDBSelectOption value="12">showtoptagschart</MDBSelectOption>
                            <MDBSelectOption value="13">showtaginfo</MDBSelectOption>
                            <MDBSelectOption value="14">showsimilartags</MDBSelectOption>
                            <MDBSelectOption value="15">showrandomtag</MDBSelectOption>
                            <MDBSelectOption value="16">showtoptags</MDBSelectOption>
                        </MDBSelectOptions>
                    </MDBSelect> */}
 
                    <FormLabel>Country<FormControl autoFocus type="text" name="country"></FormControl> </FormLabel>
                    <FormLabel>Count <FormControl autoFocus type="text" name="count"></FormControl></FormLabel>
                    <FormLabel>Playlist Name <FormControl autoFocus type="text" name="plName"></FormControl></FormLabel>
                    <Button block type="submit">Create </Button>
                </form>
            </div>
        );
    }
}
export default Discovery;