import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from "material-ui/TextField";
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
const names = [
  'C',
  'Java',
  'Android',
  'React',
  'C#',
  'Xamarin',
  'PHP',
  
];

/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */
class MyProfile extends Component {
  state = {
    values: [],
    userProfile: {}
  };

  handleChange = (event, index, values) => this.setState({values});

  menuItems(values) {
    return names.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }
  componentDidMount () {
    if(localStorage.getItem('token')){
        var userObj =JSON.parse(localStorage.getItem('user'))
        axios.get('https://talent-dashboard-app.herokuapp.com/userdetail?userId='+userObj['_id'],{ headers: { token: localStorage.getItem('token') } }).then(response => {
            this.setState({ userProfile: response.data['data'] });
        }).catch((error) => {
            console.log(error)
        })
    }
    else{
        this.props.history.push('/login')
    }
}
  render() {
    const style = {
  margin: 12,
};
    const styles = {
  headline: {
    fontSize: 15,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  employee: {
    fontSize: 15,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    height:100,
    width:100

    }
};
    const {values} = this.state;
    return (
        <div style={{marginRight: "40px",marginLeft: "40px",paddingTop:"20px",paddingBottom:"50px"}}>
      <MuiThemeProvider>
      <div>
                    <center>
                        <Avatar style={styles.employee} src="https://www.iconexperience.com/_img/g_collection_png/standard/256x256/businessman.png" />
                    </center>
 <Tabs 
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <Tab label="Update My Profile" value="a" style={{backgroundColor: "#337ab7"}}>
                        <RaisedButton className="raised_button" backgroundColor="#B0BEC5"  style={style} label="Update" /><br/>
                        <div className="col-md-6">
                            <h6 style={styles.headline}>First Name</h6>
                            <TextField value={this.state.userProfile['firstName']} />
                        </div>
                        
                        <div className="col-md-6">
                            <h6 style={styles.headline}>Middle Name</h6>
                            <TextField value={this.state.userProfile['middleName']}/>
                        </div>
                        
                        <div className="col-md-6">
                            <h6 style={styles.headline}>Last Name</h6>
                            <TextField value={this.state.userProfile['lastName']} />
                        </div>
                        <div className="col-md-6">
                            <h6 style={styles.headline}>Employee Code</h6>
                            <TextField value={this.state.userProfile['employeeCode']} />
                        </div>
                        <div className="col-md-6">
                            <h6 style={styles.headline}>Email Address</h6>
                            <TextField value={this.state.userProfile['emailAddress']}/>
                        </div>
                        <div className="col-md-6">
                            <h6 style={styles.headline}>Gender</h6>
                            <TextField value={this.state.userProfile['gender']} />
                        </div>
                        <div className="col-md-6">
                            <h6 style={styles.headline}>Mobile Number</h6>
                            <TextField value={this.state.userProfile['mobileNumber']} />
                        </div>
                        <div className="col-md-6">
                         <h6 style={styles.headline}>Skills</h6>
                            <SelectField multiple={true} hintText="Select a skills" value={values} onChange={this.handleChange}>
        {this.menuItems(values)}
      </SelectField>
                        </div>
                        </Tab>
                    </Tabs>
                    
                </div>




      
        </MuiThemeProvider>
        </div>
    );
  }
}
export default MyProfile;