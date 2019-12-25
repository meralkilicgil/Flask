import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect
} from "shards-react";

const CustomSelect = () => (
  <div>
    <InputGroup className="mb-3">
      {/* <InputGroupAddon type="prepend">
        <InputGroupText>Options</InputGroupText>
      </InputGroupAddon> */}
      <FormSelect>
        <option>Choose</option>
        <option value="1">Show top albums by tag</option>
        <option value="2">Show top tracks by tag</option>
      </FormSelect>
    </InputGroup>

    {/* <InputGroup className="mb-3">
      <FormSelect>
        <option>Choose</option>
        <option>...</option>
      </FormSelect>
      <InputGroupAddon type="append">
        <InputGroupText>Options</InputGroupText>
      </InputGroupAddon>
    </InputGroup> */}
  </div>
);

export default CustomSelect;
