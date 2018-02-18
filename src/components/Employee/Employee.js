import React, { Component } from 'react';
import classes from './Employee.css';
import ReactTable from 'react-table';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import  '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import  '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
class Employee extends Component {
    constructor (){
        super();
        this.state = {
            employeeList:[]
        }
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
    // afterSearch(searchText, result) {
    //     console.log('Your search text is ' + searchText);
    //     console.log('Result is:');
    //     for (let i = 0; i < result.length; i++) {
    //         console.log('Fruit: ' + result[i].id + ', ' + result[i].name + ', ' + result[i].price);
    //     }
    // }
      
     
    render() {
        const options = {}
        const employees = [];
        if(this.state.employeeList){
            this.state.employeeList.forEach((emp) =>{
                employees.push({
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
            <div id="page-wrapper" className="bg-neutral-li">
                <BootstrapTable data={ employees } search={ true } loading={ true } pagination striped={true} hover={true} condensed={true} exportCSV>
                    <TableHeaderColumn dataField='employeeCode' isKey dataSort dataAlign='center' headerAlign='center'>Emp Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='employeeName' dataSort dataAlign='center' headerAlign='center'>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='emailAddress' dataSort dataAlign='center' headerAlign='center' width="25%">Email Address</TableHeaderColumn>
                    <TableHeaderColumn dataField='gender' dataSort dataAlign='center' headerAlign='center'>Gender</TableHeaderColumn>
                    <TableHeaderColumn dataField='skills' dataAlign='center' headerAlign='center' tdStyle={ { whiteSpace: 'normal' } }>Skills</TableHeaderColumn>
                    <TableHeaderColumn dataField='showUrl' dataAlign='center' headerAlign='center'>Url</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
        document.getElementById('basic')
    }
}

export default Employee;