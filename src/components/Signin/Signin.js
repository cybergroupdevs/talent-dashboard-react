import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
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
                    localStorage.setItem('user', response['data']['employee']);
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
                                <h3 class="panel-title">Please Sign In</h3>
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
                                        <button type="button" className="btn btn-lg btn-success btn-block"  onClick={this.handleSubmit}>Login</button>
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