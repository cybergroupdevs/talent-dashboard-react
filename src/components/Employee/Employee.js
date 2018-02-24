import React, { Component } from 'react';
import classes from './Employee.css';
import ReactTable from 'react-table';
import axios from 'axios';
import {Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from "react-tap-event-plugin";
import orderBy from "lodash/orderBy";
import TextField from "material-ui/TextField";
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
        editIdx: -1,
        columnToSort: "",
        sortDirection: "desc",
        employeeList: []
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
    render() {
        const employees = [];
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
                                <TableRowColumn><Link to="/userdetail">View Detail</Link></TableRowColumn>
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