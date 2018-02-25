import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import {Link} from 'react-router-dom';
class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "emailAddress":"",
            "password":""
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    handleSubmit = () =>{
        console.log(this.state)
        axios.post('https://talent-dashboard-app.herokuapp.com/login', this.state).then((response) => {
            if(response.status == 200){
                var response = response.data
                if(response['status']){
                    localStorage.setItem('user', JSON.stringify(response['data']['employee']));
                    localStorage.setItem('token', response['data']['token'])
                    if(localStorage.getItem('token')){
                        var userObj =JSON.parse(localStorage.getItem('user'))
                        if(userObj['userType'] && userObj['userType'].toUpperCase() == "ADMIN"){
                            this.props.history.push('/admin/dashboard')
                        }
                        else{
                            this.props.history.push('/dashboard')
                        }
                    }
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
        if(localStorage.getItem('token')){
            var userObj =JSON.parse(localStorage.getItem('user'))
            if(userObj['userType'] && userObj['userType'].toUpperCase() == "ADMIN"){
                this.props.history.push('/admin/dashboard')
            }
            else{
                this.props.history.push('/dashboard')
            }
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="login-panel panel panel-default">
                            <div className="panel-div-ui panel-heading ">
                                <span class="panel-title" style={{marginLeft: "58px"}}>Please Sign In </span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/register" style={{textAlign: 'right'}} className="btn btn-sm btn-primary">Register</Link>
                            </div>
                            <div className="panel-body">
                                <form role="form">
                                        <fieldset>
                                            <div className="form-group">
                                            <input className="form-control" type="email" placeholder="Enter Email Address" name="emailAddress" defaultValue={this.state.emailAddress} onChange={(event) => this.setState({emailAddress:event.target.value})} required autofocus/>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" type="password" placeholder="Enter Password" name="password" defaultValue={this.state.password} onChange={(event) => this.setState({password:event.target.value})} required autofocus/>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input name="remember" type="checkbox" value="Remember Me"/>Remember Me
                                                </label>
                                            </div>
                                            <button type="button" className="btn btn-lg btn-primary btn-block"  onClick={this.handleSubmit}>Login</button>
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

export default Signin;