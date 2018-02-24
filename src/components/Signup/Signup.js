import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "firstName": "",
            "lastName":"",
            "emailAddress":"",
            "employeeCode":"",
            "password":""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    handleSubmit = () =>{
        axios.post('https://talent-dashboard-app.herokuapp.com/register', this.state).then((response) => {   
            if(response.status == 200){
                var response = response.data
                if(response['status']){
                    localStorage.setItem('user', JSON.stringify(response['data']['employee']));
                    localStorage.setItem('token', response['data']['token'])
                    this.props.history.push('/')
                }
                else{
                    alert(response['mesage'])
                }
            }
            else{
                alert(response.statusText)
            }
        }).catch((error) => {
            console.log(error)
        });
    }
    componentDidMount () {
        if(localStorage.getItem('user')){
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-div-ui panel-heading ">
                            <h3 class="panel-title">Please Sign Up</h3>
                        </div>
                        <div className="panel-body">
                        <form role="form">
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" type="text" placeholder="First Name" name="firstName" defaultValue={this.state.firstName} onChange={(event) => this.setState({firstName:event.target.value})} required autofocus/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="text" placeholder="Last Name" name="lastName" defaultValue={this.state.lastName} onChange={(event) => this.setState({lastName:event.target.value})} required autofocus/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="email" placeholder="Enter Email Address" name="emailAddress" defaultValue={this.state.emailAddress} onChange={(event) => this.setState({emailAddress:event.target.value})} required autofocus/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="text" placeholder="Employee Code" name="employeeCode" defaultValue={this.state.employeeCode} onChange={(event) => this.setState({employeeCode:event.target.value})} required autofocus/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="password" placeholder="Enter Password" name="password" defaultValue={this.state.password} onChange={(event) => this.setState({password:event.target.value})} required autofocus/>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input name="remember" type="checkbox" value="Remember Me"/>Remember Me
                                        </label>
                                    </div>
                                    <button type="button" className="btn btn-lg btn-success btn-block"  onClick={this.handleSubmit}>Register</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Signup;