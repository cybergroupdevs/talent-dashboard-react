import React, { Component } from 'react';
import classes from './Signup.css'
class SignupForm extends Component {
    render() {
        return (
            <div>
                <form action="">
                    <div className={classes.imgcontainer}>
                        <img src="https://media.glassdoor.com/sqll/277861/cyber-group-squarelogo-1404765123554.png" alt="Avatar" className={classes.avatar}/>
                    </div>
                    <div className={classes.container}>
                        <div>
                        <input type="email" placeholder="Enter Email Address" name="email_address" required/>
                        </div>
                        <div>
                        <input type="text" placeholder="CGI Code" name="cgi_code" required/>
                        </div>
                        <div>
                        <input type="password" placeholder="Enter Password" name="psw" required/>
                        </div>
                        <div>
                        <button type="submit" className="btn-primary">Register</button>
                        </div>
                        <label>
                        <input type="checkbox" checked="checked" name="remember"/> Remember me
                        </label>
                    </div>
                    <div className={classes.container}>
                        <button type="button" className={classes.cancelbtn}>Cancel</button>
                        <div className={classes.psw}>Forgot <a href="#">password?</a></div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignupForm;