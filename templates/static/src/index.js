import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* ReactDOM.componentDidMount() {
    this.loadSript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/demo.js");
    this.loadSript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js");
    this.loadSript("https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js");
  }<canvas id="demo-canvas"></canvas>
  ReactDOM.loadSript(src) {
    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    document.getElementsByTagName('body')[0].appendChild(tag);
  } */
ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
