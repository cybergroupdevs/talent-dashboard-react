import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Aux from './hoc/Aux/Aux'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/login" component={Signin} />
            <Route path="/register" component={Signup} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
