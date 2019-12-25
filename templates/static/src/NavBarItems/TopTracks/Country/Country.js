import React, { useState } from "react";
import "./Country.css";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";

class Country extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="country">
                <form action="http://localhost:5000/toptracks_country" method="post">
                    <h1>Country Top Tracks</h1>
                    <FormLabel>Country<FormControl autoFocus type="text" name="country"></FormControl> </FormLabel>
                    <FormLabel>Count <FormControl autoFocus type="text" name="count"></FormControl></FormLabel>
                    <FormLabel>Playlist Name <FormControl autoFocus type="text" name="plName"></FormControl></FormLabel>
                    <Button block type="submit">Create </Button>
                </form>
            </div>
        );
    }
}
export default Country;