import React from 'react';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
// import './App.global.css';
import MainPage from './frontend/components/mainPage/index.jsx'
import CommonDell from './frontend/components/commonDell/index.jsx'
import Tabs from './frontend/components/tabs/mainTabs'
import Template from './frontend/components/textTemplates/index'

export default function App() {
  return (<>
    <Router>
      <Tabs />
      <Switch>
        <Redirect exact path="/" to="/home" />
        <Route exact path="/home" component={MainPage}>
        </Route>
        <Route exact path="/commonDell" component={CommonDell} />
        <Route exact path="/templates" component={Template} />
      </Switch>
    </Router>
  </>)
}
