import React from 'react';
import './App.css';
import Success from './Success/Success';

class App extends React.Component{

  constructor(props){
      super(props);
  }

  render(){
    return(
    <div className="App">
    <form action = "http://localhost:5000/create" method = "post">
      
      <p>Create playlist similar to: </p>
       <p>Artist:   <input type="text" name="artist"></input></p>
       <p>Song: <input type="text" name="track"></input></p>
       <p>Count: <input type="text" name="count"></input></p>
       <p>Name: <input type="text" name="plName"></input></p>
      <input type="submit" value="Create" />
  </form>
  </div>
  );   
 }
}
export default App;
