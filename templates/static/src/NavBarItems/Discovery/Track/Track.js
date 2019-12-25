import React from 'react';
import './Track.css';
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";

class Track extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Track">
                <form action="http://localhost:5000/create" method="post">
                    <h1>Create Similar Playlist </h1>
                    <FormLabel>Artist <FormControl autoFocus type="text" name="artist"></FormControl> </FormLabel> 
                    <FormLabel>Song<FormControl autoFocus type="text" name="track"></FormControl> </FormLabel>
                    <FormLabel>Count <FormControl autoFocus type="text" name="count"></FormControl></FormLabel>
                    <FormLabel>Playlist Name <FormControl autoFocus type="text" name="plName"></FormControl></FormLabel> 
                    <Button block type="submit">Create </Button>
                </form>
            </div>
        );
    }
}
export default Track;