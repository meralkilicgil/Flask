import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";
//import getLoginItems from "../data/login-nav-items";

let _store = {
  menuVisible: false,
  navItems: getSidebarNavItems(),
  //loginItems: getLoginItems(),
  token: ""
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      case Constants.SET_TOKEN:
        _store.token = payload;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  getLoginItems() {
    //return _store.loginItems;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
