import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from "material-ui/TextField";
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
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
export default class SelectFieldExampleMultiSelect extends Component {
  state = {
    values: [],
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
                            <TextField value="" />
                        </div>
                        
                        <div className="col-md-6">
                            <h6 style={styles.headline}>Middle Name</h6>
                            <TextField value=""/>
                        </div>
                        
                        <div className="col-md-6">
                            <h6 style={styles.headline}>Last Name</h6>
                            <TextField value="" />
                        </div>
                        <div className="col-md-6">
                            <h6 style={styles.headline}>Employee Code</h6>
                            <TextField value="" />
                        </div>
                        <div className="col-md-6">
                            <h6 style={styles.headline}>Email Address</h6>
                            <TextField value="" />
                        </div>
                        <div className="col-md-6">
                            <h6 style={styles.headline}>Gender</h6>
                            <TextField value="" />
                        </div>
                        <div className="col-md-6">
                            <h6 style={styles.headline}>Mobile Number</h6>
                            <TextField value="" />
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
    );
  }
}