import React, { useState } from "react";
import "./TopTracks.css";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";

class TopTracks extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="TopTracks">
                <div className="country">
                <form action="http://localhost:5000/toptracks_country" method="post">
                    <h1>Country Top Tracks</h1>
                    <FormLabel>Country<FormControl autoFocus type="text" name="country"></FormControl> </FormLabel>
                    <FormLabel>Count <FormControl autoFocus type="text" name="count"></FormControl></FormLabel>
                    <FormLabel>Playlist Name <FormControl autoFocus type="text" name="plName"></FormControl></FormLabel>
                    <Button block type="submit">Create </Button>
                </form>
                </div>
                <div className="artist">
                <form action="http://localhost:5000/toptracks_artist" method="post">
                    <h1>Top Tracks of Artist</h1>
                    <FormLabel>Artist<FormControl autoFocus type="text" name="artist"></FormControl> </FormLabel>
                    <FormLabel>Count <FormControl autoFocus type="text" name="count"></FormControl></FormLabel>
                    <FormLabel>Playlist Name <FormControl autoFocus type="text" name="plName"></FormControl></FormLabel>
                    <Button block type="submit">Create </Button>
                </form>
                </div>
                <div className="tag">
                <form action="http://localhost:5000/toptracks_tag" method="post">
                    <h1>Top Tracks of Genre</h1>
                    <FormLabel>Genre<FormControl autoFocus type="text" name="tag"></FormControl> </FormLabel>
                    <FormLabel>Count <FormControl autoFocus type="text" name="count"></FormControl></FormLabel>
                    <FormLabel>Playlist Name <FormControl autoFocus type="text" name="plName"></FormControl></FormLabel>
                    <Button block type="submit">Create </Button>
                </form>
                </div>
            </div>
        );
    }
}
export default TopTracks;
