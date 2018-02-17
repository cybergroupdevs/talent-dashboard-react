import React, { Component } from 'react';
import classes from './Employee.css';
import ReactTable from 'react-table';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
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
        const columns = [{
            Header: 'CGI Code',
            headerClassName: 'my-favorites-column-header-group',
            accessor: 'employeeCode' // String-based value accessors!
          }, {
            Header: 'Name',
            headerClassName: 'my-favorites-column-header-group',
            accessor: 'employeeName',
          }, {
            Header: 'Email Id',
            headerClassName: 'my-favorites-column-header-group',
            accessor: "emailAddress"
          },{
            Header: 'Gender',
            headerClassName: 'my-favorites-column-header-group',
            accessor: "gender"
          },{
            Header: 'Skills',
            headerClassName: 'my-favorites-column-header-group',
            accessor: "skills"
          }, {
            Header: "Action",
            headerClassName: 'my-favorites-column-header-group',
            accessor: "showUrl"
          }]
         
        return (
            <div>
                <BootstrapTable data={ employees } search={ true } options={ options } pagination striped hover condensed>
                    <TableHeaderColumn dataField='employeeCode' isKey>Employee Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='employeeName'>Employee Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='emailAddress'>Email Address</TableHeaderColumn>
                    <TableHeaderColumn dataField='gender'>Gender</TableHeaderColumn>
                    <TableHeaderColumn dataField='skills'>Skills</TableHeaderColumn>
                    <TableHeaderColumn dataField='showUrl'>Url</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
        document.getElementById('basic')
    }
}

export default Employee;