import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import classes from './Header.css'
const styles = {
    customWidth: {
      width: 200,
    },
  };
  
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 1};
    }
    componentDidMount () {
        if(!localStorage.getItem('user')){
            // this.props.history.push('/login')
        }
    }
    handleChange = (event, index, value) => this.setState({value});
    
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                    titleStyle={{lineHeight:"54px"}}
                    title="" style={{backgroundColor: "dimgrey", height:"54px","-webkit-box-shadow": "0 3px 4px #D5D8DC  "}} 
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementLeft={
                        <div>
                        <img src="http://www.mangalmay.org/upload/companylogo/companylogo_54826289.png" width="25%" style={{ marginTop: "1%", marginLeft: "-28%"}} />
                        <Link to="/" style={{marginLeft: "30px",color:"white",textDecoration:"none"}}>Dashboard</Link>
                        <Link to="/employee_list" style={{marginLeft: "30px",color:"white",textDecoration:"none"}}>Employee List</Link>
                        </div>
                    }
                    iconElementRight={
                            <div>
                                <Avatar src="http://sported.org.uk/file/2015/10/Blank-person-photo1.png" />
                                
                            </div>
                        }
                    />
                    
                </MuiThemeProvider>
            </div>
        )}
};
export default Header;