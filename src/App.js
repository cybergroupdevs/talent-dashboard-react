import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Header from '../src/components/Header/Header';
import EmployeeForm from '../src/components/Form/Form';
import Signin from './components/Signin/Signin';
import Employee from './components/Employee/Employee';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Aux from './hoc/Aux/Aux'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header/>
          <Switch>
            <Route path="/login" component={Signin} />
            <Route path="/register" component={Signup} />
            <Route path="/employee_list" component={Employee} />
            <Route path="/edit" component={EmployeeForm} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
