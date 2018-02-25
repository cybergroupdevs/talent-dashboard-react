import React, { Component } from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Header from '../src/components/Header/Header';
import EmployeeForm from '../src/components/Form/Form';
import Signin from './components/Signin/Signin';
import Employee from './components/Employee/Employee';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Aux from './hoc/Aux/Aux'
class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="App">
        <Layout>
          
          <Header currentUser={JSON.parse(localStorage.getItem('user'))} clickOnLogout={this.logout}/>
          <Switch>
            <Route path="/login" component={Signin} />
            <Route path="/register" component={Signup} />
            <Route path="/employee_list" component={Employee} />
            <Route path="/admin/employee_list" component={Employee} />
            <Route path="/edit" component={EmployeeForm} />
            <Route path="/" component={Dashboard} />
            <Route path="/admin" component={Dashboard} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
