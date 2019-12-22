import React, { useState } from "react";
import "./Success.css";

class Success extends React.Component{

  constructor(props){
      super(props);
      
  }
  render(){
    return (
      <div className="Success">  
        <form  action = "http://localhost:5000/success" method = "get">
          <p>Your playlist has been successfully created! </p>      
        </form>  
      </div>
    );
  }
}
export default Success;
