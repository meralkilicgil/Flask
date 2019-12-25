import React, { useState } from "react";
import "./Tag.css";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";

class Tag extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="tag">
            <form action="http://localhost:5000/toptracks_tag" method="post">
                <h1>Top Tracks of Genre</h1>
                <FormLabel>Genre<FormControl autoFocus type="text" name="tag"></FormControl> </FormLabel>
                <FormLabel>Count <FormControl autoFocus type="text" name="count"></FormControl></FormLabel>
                <FormLabel>Playlist Name <FormControl autoFocus type="text" name="plName"></FormControl></FormLabel>
                <Button block type="submit">Create </Button>
            </form>
        </div>
        );
    }
}
export default Tag;