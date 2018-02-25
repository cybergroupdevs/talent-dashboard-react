import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import {Route, Switch, withRouter} from 'react-router-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import classes from './Header.css'
import logo from './logo.png';
import { transparent } from 'material-ui/styles/colors';
const styles = {
    customWidth: {
      width: 200,
    },
  };
  
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
                value: 1,
                open: false};
        
    }
    logout = () =>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.props.history.push('/login')
        this.setState({
            open: false,
          });
      }
    // state = {value: 1,open: false};
    componentDidMount () {
        this.state.open= false
        if(!localStorage.getItem('token')){
            this.props.history.push('/login')
        }
    }
    handleChange = (event, index, value) => this.setState({value});
    handleClick = (event) => {
    // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };
    fetchListUrl = (text) =>{
        if(localStorage.getItem('token')){
            var userObj =JSON.parse(localStorage.getItem('user'))
            if(userObj['userType'] && userObj['userType'].toUpperCase() == "ADMIN"){
                return "/admin/"+text
            }
            else{
                return "/"+text
            }
        }
        else{
            return "#"
        }
    }
    handleRequestClose = () => {
        this.setState({
          open: false,
        });
      };
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                    titleStyle={{lineHeight:"54px"}}
                    title="" style={{backgroundColor: "#337ab7", height:"54px","-webkit-box-shadow": "0 3px 4px #D5D8DC  "}} 
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementLeft={
                        localStorage.getItem('token')?
                        <div>
                        <img src={logo} width="23%" style={{ marginTop: "1%", marginLeft: "-28%"}} />
                        <Link to={this.fetchListUrl('dashboard')} style={{marginLeft: "30px",color:"white",textDecoration:"none"}}>Dashboard</Link>
                        <Link to={this.fetchListUrl('employee_list')} style={{marginLeft: "30px",color:"white",textDecoration:"none"}}>Employee List</Link>
                        </div>:
                        <div>
                            <img src={logo} width="45%" style={{ marginTop: "1%", marginLeft: "-38%"}} />
                        
                        </div>
                    }
                    iconElementRight={
                            <div>
                                <label for="#" style={{fontWeight: "300",paddingLeft: "20px",paddingRight:"10px","color":"white",marginTop:"8px"}} onClick={this.handleClick}>{this.props.currentUser?this.props.currentUser.displayName:""}</label>
                                <Popover
                                open={this.state.open}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                onRequestClose={this.handleRequestClose}
                                style={{backgroundColor: "#337ab7", paddingLeft: "20px","fontSize":"12px",color:"white"}}
                                >
                                <Menu >
                                <Link to={this.fetchListUrl('myprofile')}><MenuItem style={{color: "white",fontSize: "14px"}} primaryText="My Profile"></MenuItem></Link>
                                    <MenuItem style={{color: "white",fontSize: "14px"}} primaryText="Logout" onClick={this.logout}/>
                                </Menu>
                                </Popover>
                                
                                
                            </div>
                        }
                    />
                    
                </MuiThemeProvider>
            </div>
        )}
};
export default withRouter(Header);