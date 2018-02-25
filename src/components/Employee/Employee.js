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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import  '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Chip from 'material-ui/Chip';

// import {
//     Table,
//     TableBody,
//     TableHeader,
//     TableHeaderColumn,
//     TableRow,
//     TableRowColumn,
//   } from 'material-ui/Table';
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
        userdetail: {},
        open: false, 
        deleteRow: false
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
        if(localStorage.getItem('token')){
            var userObj =JSON.parse(localStorage.getItem('user'))
            if(userObj['userType'] && userObj['userType'].toUpperCase() == "ADMIN"){
                this.state.deleteRow = true
            }
        }
        if(localStorage.getItem('token')){
            axios.get('https://talent-dashboard-app.herokuapp.com/employeeList?pageNo=1&limit=100',{ headers: { token: localStorage.getItem('token') } }).then(response => {
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
    handleDeleteRow = (row) => {
        var d = row[0]
        console.log(d)
        axios.defaults.headers.common['token'] = localStorage.getItem('token');
        axios.delete('https://talent-dashboard-app.herokuapp.com/deleteEmployee',{data: {userId: d}}).then(response => {
            return true;
        }).catch((error) => {
            console.log(error)
        })
        
    };
  handleDelete = () => {
    if(localStorage.getItem('token')){
        var userObj =JSON.parse(localStorage.getItem('user'))
        if(userObj['userType'] && userObj['userType'].toUpperCase() == "ADMIN"){
            console.log("I am her")
            return true
        }
        else{
            console.log("I am heradad")
            
            return false
        }
    }
    else{
        return false
    }
  }
    cellButton(cell, row, enumObject, rowIndex) {
        if(localStorage.getItem('token')){
            var userObj =JSON.parse(localStorage.getItem('user'))
            if(userObj['userType'] && userObj['userType'].toUpperCase() == "ADMIN"){
                return (
                    <MuiThemeProvider>
                        <RaisedButton className="raised_button" backgroundColor="#337ab7" className={classes.raised_button} onClick={this.handleOpen.bind(this,row.employeeId)} label="View Detail"/>
                    </MuiThemeProvider>
                    )
            }
            else{
                return (
                <MuiThemeProvider>
                    <RaisedButton className="raised_button" backgroundColor="#337ab7" className={classes.raised_button} onClick={this.handleOpen.bind(this,row.employeeId)} label="View Detail"/>
                </MuiThemeProvider>
                )
            }
        }
        else{
            return "#"
        }
     }
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
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
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
                    "employeeId": emp['_id'],
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
            
                <BootstrapTable data={employees} exportCSV pagination search={ true } trClassName='tr_table' tdClassName='td_table' tableHeaderClass='header_table' tableBodyClass='table_body' deleteRow={ this.state.deleteRow } options={ { onDeleteRow: this.handleDeleteRow} } selectRow={ { mode: 'radio' } }>
                    <TableHeaderColumn dataField="employeeId" isKey={true} hidden>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField="employeeCode" dataAlign="center" dataSort={true}>Emp ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="employeeName" dataAlign="center" dataSort={true}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="emailAddress" dataAlign="center" dataSort={true} >Employee Address</TableHeaderColumn>
                    <TableHeaderColumn dataField="skills" >Skills</TableHeaderColumn>
                    <TableHeaderColumn dataField="employeeId" dataFormat={this.cellButton.bind(this)}>Button</TableHeaderColumn>
                </BootstrapTable>
                <MuiThemeProvider>
                <Dialog title="Employee Detail" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent={true}>
                    <center>
                        <Avatar style={styles.employee} src="https://www.iconexperience.com/_img/g_collection_png/standard/256x256/businessman.png" />
                    </center>
                    <Tabs 
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <Tab label="Personal Details" value="a" style={{backgroundColor: "#337ab7"}}>
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
                        <Tab label="Skills Details" value="b" style={{backgroundColor: "#337ab7"}}>
                        <div>
                         <Chip
          style={styles.chip}
        >
          {this.state.userdetail.skills}
        </Chip>
                                    <h6 style={styles.headline}>{this.state.userdetail.skills}</h6>
                                
                            
                        
                            
                        </div>
                        </Tab>
                    </Tabs>
                </Dialog>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Employee;