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
                    title="" style={{backgroundColor: "dimgrey", height:"54px","-webkit-box-shadow": "0 3px 4px #D5D8DC  "}} 
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementLeft={
                        localStorage.getItem('token')?
                        <div>
                        <img src="http://www.mangalmay.org/upload/companylogo/companylogo_54826289.png" width="25%" style={{ marginTop: "1%", marginLeft: "-28%"}} />
                        <Link to="/" style={{marginLeft: "30px",color:"white",textDecoration:"none"}}>Dashboard</Link>
                        <Link to="/employee_list" style={{marginLeft: "30px",color:"white",textDecoration:"none"}}>Employee List</Link>
                        </div>:
                        <div>
                            <img src="http://www.mangalmay.org/upload/companylogo/companylogo_54826289.png" width="45%" style={{ marginTop: "1%", marginLeft: "-48%"}} />
                        
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
                                style={{backgroundColor: "dimgrey", paddingLeft: "20px","fontSize":"12px",color:"white"}}
                                >
                                <Menu >
                                    <MenuItem style={{color: "white",fontSize: "14px"}} primaryText="My Profile"><Link to="/myprofile"/></MenuItem>
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