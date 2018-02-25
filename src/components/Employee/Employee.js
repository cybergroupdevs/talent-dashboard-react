import React, { Component } from 'react';
import classes from './Employee.css';
import ReactTable from 'react-table';
import axios from 'axios';
import {Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from "react-tap-event-plugin";
import orderBy from "lodash/orderBy";
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
// import  '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
const invertDirection = {
    asc: "desc",
    desc: "asc"
  };
class Employee extends Component {
    state = {
        fixedHeader: true,
        fixedFooter: true,
        stripedRows: false,
        showRowHover: false,
        selectable: false,
        multiSelectable: true,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: true,
        height: '300px',
        employeeList: [],
        userdetail: [],
        editIdx: -1,
        columnToSort: "",
        sortDirection: "desc",
        employeeList: [],
        userdetail: [],
        open: false
      };
    handleOpen = (id,e) => {
        console.log(id);
    this.setState({open: true});
    if(localStorage.getItem('user')){
            axios.get('https://talent-dashboard-app.herokuapp.com/userdetail?userId='+ id,{ headers: { token: localStorage.getItem('token') } }).then(response => {
                this.setState({ userdetail: response.data['data'] });
            }).catch((error) => {
                console.log(error)
            })
        }
        else{
            this.props.history.push('/login')
        }
  };

  handleClose = () => {
    this.setState({open: false});
  };
    handleChange (event) {
        axios.get('https://talent-dashboard-app.herokuapp.com/employeeList?pageNo=1&searchkey='+event.target.value,{ headers: { token: localStorage.getItem('token') } }).then(response => {
            this.setState({ employeeList: response.data['data'] });
        }).catch((error) => {
            console.log(error)
        })
    }
    componentDidMount () {
        if(localStorage.getItem('user')){
            axios.get('https://talent-dashboard-app.herokuapp.com/employeeList?pageNo=1',{ headers: { token: localStorage.getItem('token') } }).then(response => {
                this.setState({ employeeList: response.data['data'] });
            }).catch((error) => {
                console.log(error)
            })
        }
        else{
            this.props.history.push('/login')
        }
    }
    handleRemove = i => {
        this.setState(state => ({
          data: state.data.filter((row, j) => j !== i)
        }));
      };
    
      startEditing = i => {
        this.setState({ editIdx: i });
      };
    
      stopEditing = () => {
        this.setState({ editIdx: -1 });
      };
    
      handleSave = (i, x) => {
        this.setState(state => ({
          data: state.data.map((row, j) => (j === i ? x : row))
        }));
        this.stopEditing();
      };
    
      handleSort = columnName => {
        this.setState(state => ({
          columnToSort: columnName,
          sortDirection:
            state.columnToSort === columnName
              ? invertDirection[state.sortDirection]
              : "asc"
        }));
      };
    

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };
    render() {
        const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      
    ];
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
    width:100,
    

  },
};
        const employees = [];
        const skills = [];
        const style = {
  margin: 12,
};

        if(this.state.employeeList && this.state.employeeList.length >0){
            this.state.employeeList.forEach((emp) =>{
                employees.push({
                    "img": "https://www.iconexperience.com/_img/g_collection_png/standard/256x256/businessman.png",
                    "employeeCode": emp['employeeCode'],
                    "employeeName": emp['displayName'],
                    "emailAddress": emp['emailAddress'],
                    "gender": emp['gender'],
                    "skills": (emp['skills'] && emp['skills'].length>0)?emp['skills'].join(', '):"-",
                    "showUrl": <a href="https://talent-dashboard-app.herokuapp.com/userdetail?userId=1234&token=2dad">Url</a>

                })
            })
        }
        
        return (
            
            <div style={{marginRight: "40px",marginLeft: "40px",paddingTop:"20px",paddingBottom:"50px"}}>
                <div className="form-group">
                    <input type="text" className="form-control" id="usr" onChange={this.handleChange}/>
                </div>
                <MuiThemeProvider>
                    <Table multiSelectable={this.state.multiSelectable}>
                        <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Employee Code</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Email Address</TableHeaderColumn>
                            <TableHeaderColumn>Skills</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {this.state.employeeList.map((emp) => (
                            <TableRow>
                                <TableRowColumn>{emp.employeeCode}</TableRowColumn>
                                <TableRowColumn>{emp.displayName}</TableRowColumn>
                                <TableRowColumn>{emp.emailAddress}</TableRowColumn>
                                <TableRowColumn>{emp.skills}</TableRowColumn>
                                <TableRowColumn><RaisedButton onClick={this.handleOpen.bind(this,emp._id)} label="View Detail" secondary={true} style={style} /></TableRowColumn>
                             <Dialog title="User Detail" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent={true}
        >
        <center>
         
    <Avatar style={styles.employee} src="https://www.iconexperience.com/_img/g_collection_png/standard/256x256/businessman.png" />
     </center>
      <Tabs 
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Personal Details" value="a">
          <div className="col-md-6">
            <h6 style={styles.headline}>First Name</h6>
             <TextField value={this.state.userdetail.firstName} />
          </div>
         
           <div className="col-md-6">
            <h6 style={styles.headline}>Middle Name</h6>
             <TextField value={this.state.userdetail.middleName}/>
          </div>
          
           <div className="col-md-6">
            <h6 style={styles.headline}>Last Name</h6>
             <TextField value={this.state.userdetail.lastName} />
          </div>
          <div className="col-md-6">
            <h6 style={styles.headline}>Employee Code</h6>
             <TextField value={this.state.userdetail.employeeCode} />
          </div>
          <div className="col-md-6">
            <h6 style={styles.headline}>Email Address</h6>
             <TextField value={this.state.userdetail.emailAddress} />
          </div>
          <div className="col-md-6">
            <h6 style={styles.headline}>Gender</h6>
             <TextField value={this.state.userdetail.gender} />
          </div>
          <div className="col-md-6">
            <h6 style={styles.headline}>Mobile Number</h6>
             <TextField value={this.state.userdetail.mobileNumber} />
          </div>
        </Tab>
        <Tab label="Skills Details" value="b">
          <div>
          
             
                <h6 style={styles.headline}>{ this.state.userdetail.skills}</h6>
            
           
            
          </div>
        </Tab>
      </Tabs>
        </Dialog>
                                 
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Employee;