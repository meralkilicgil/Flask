import React, { Component } from "react";
import GoogleAnalytics from "react-ga";

GoogleAnalytics.initialize(process.env.REACT_APP_GAID || "UA-115105611-2");

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
  };

  const BASENAME = process.env.REACT_APP_BASENAME || "";

  // eslint-disable-next-line
  const HOC = class extends Component {
    componentDidMount() {
    
    }

    componentDidUpdate(prevProps) {

    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default withTracker;
