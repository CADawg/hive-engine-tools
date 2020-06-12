import React from 'react';
import HiveEngineAPI from './HiveEngineAPI.js';
import './HiveEngineToolsV2.scss';
const store = require('store/dist/store.modern');

const HiveEngine = new HiveEngineAPI();

class HiveEngineToolsV2 extends React.Component {
  constructor(props) {
    super(props);

    this.pageData = {
      "/delegations": {
        "title": "Delegations"
      },
      "/markets": {
        "title": "Markets"
      },
      "/users": {
        "title": "Users"
      },
      "/": {
        "title": "Home"
      }
    };

    this.state = {
      path: window.location.pathname,
    };

    if (this.state.path !== "/") {
      if (this.pageData[this.state.path] !== undefined) {
        document.title = this.pageData[this.state.path]["title"] + " | Hive Engine Tools";
      }
    }
  }

  setPathFromLink(event, target_page = "") {
    if (target_page === "") {
      target_page = event.target.getAttribute("href");
    }
    if (this.pageData[target_page] !== undefined) {
      event.preventDefault();
      this.setState({"path": target_page});
      window.history.pushState(null, this.pageData[target_page] + " | Hive Engine Tools", target_page);
      document.title = this.pageData[target_page]["title"] + " | Hive Engine Tools";
    }
  }

  render ()
  {
    return (
        <React.Fragment>
          <header>
            <div className="header-logo" onClick={event => {this.setPathFromLink(event, "/")}}>
              <h1>Hive Engine Tools</h1>
              <p>Slightly More Tolerable Edition&trade;</p>
            </div>
            <div className="header-links">
              <div className="header-link"><a onClick={event => {this.setPathFromLink(event);}} href="/delegations">Delegations</a></div>
              <div className="header-link"><a onClick={event => {this.setPathFromLink(event);}} href="/markets">Markets</a></div>
              <div className="header-link"><a onClick={event => {this.setPathFromLink(event);}} href="/users">Users</a></div>
              <div className="header-link"><a onClick={event => {this.setPathFromLink(event);}} href="/donate">Donate</a></div>
            </div>
            <div className="header-expander"/>
          </header>
          <PageLoader url={this.state.path} pageData={this.pageData} />
          <footer>

          </footer>
        </React.Fragment>
    );
  }
}

class PageLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderPageFromProps() {
    switch(this.props.url) {
      case "/delegations":
        return (<DelegationsPage url={this.props.url} />);
      case "/markets":
        return (<MarketsPage url={this.props.url} />);
      case "/users":
        return (<UsersPage url={this.props.url} />);
      case "/":
        return (<HomePage url={this.props.url} />);
      case "/donate":
        return (<DonatePage url={this.props.url} />);
      default:
        return (<ErrorPage type="404" url={this.props.url} />);
    }
  }

  render () {
    return (
      <main className="App">
        {this.renderPageFromProps()}
      </main>
    );
  }
}

class Advertisement1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = { shown: true };

    if (store.get("hidePrompt")) {
      if ((new Date(store.get("hidePrompt")[1])) > (new Date())) {
        this.state.shown = false;
      } else {
        store.remove("hidePrompt");
      }
    }
  }

  removeAd() {
    let date_expires = new Date();
    date_expires.setDate(date_expires.getDate() + 10);
    store.set("hidePrompt", [true, date_expires.toISOString()]);
    this.setState({"shown": false});
  }

  render() {
    if (this.state.shown) {
      return (
          <div className="display-unit">
            <p>Care to help support the project and keep it Advertisement & Subscription-free?</p>
            <div className="unit-expander"/>
            <button onClick={() => this.removeAd()}>No, Thanks</button>
            <a href="/donate">Donate</a>
            <a href="https://vote.hive.uno" target="_blank" rel="noopener noreferrer">Vote @CADawg Witness</a>
          </div>
      );
    } else {
      return "";
    }
  }
}

function HomePage(props) {
  return (
    <div className="container">
      <h2 className="thin-text">Welcome to Hive Engine Tools</h2>
      <p>This is an improved version of <a href="https://steem.tools/steemengine" rel="nofollow">SE Tools</a>, which should act and feel faster than the classic version of this. Also, it no longer runs on Steemy&trade; so that's an improvement.</p>
      <h3 className="thin-text">Built by <a href="https://peakd.com/@cadawg" rel="nofollow">@cadawg</a>.</h3>
      <Advertisement1/>
    </div>
  )
}

function MarketsPage(props) {
  return (
      <h1>404, That's an error.</h1>
  );
}

function DonatePage(props) {
  return (
      <h1>404, That's an error.</h1>
  );
}

function UsersPage(props) {
  return (
      <h1>404, That's an error.</h1>
  );
}

function DelegationsPage(props) {
  return (
      <h1>404, That's an error.</h1>
  );
}

function ErrorPage(props) {
  return (
    <div className="container">
      <h1>{props.type}, That's an error.</h1>
      <h2>The Requested URL {props.url} wasn't found on this server.</h2>
      <h3>Oh noes! What did you do to the poor Server? (╯°Д°)╯︵/(.□ . \)</h3>
    </div>
  );
}

export default HiveEngineToolsV2;
