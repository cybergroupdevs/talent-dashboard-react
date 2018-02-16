import React, { Component } from 'react';
import classes from './Employee.css';
import ReactTable from 'react-table';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
class Employee extends Component {
    constructor (){
        super();
        this.state = {
            employeeList:[{
                employeeId:"",
                employeeName:"",
                emailAddress:"",
                designation:""
            }]
        }
    }
    componentDidMount () {
        axios.get('https://talent-dashboard-app.herokuapp.com/employeelist', {
            responseType: 'json'
        }).then(response => {
            this.setState({ employeeList: response.data });
        }).catch((error) => {
            console.log(error)
        })
    }
    afterSearch(searchText, result) {
        console.log('Your search text is ' + searchText);
        console.log('Result is:');
        for (let i = 0; i < result.length; i++) {
            console.log('Fruit: ' + result[i].id + ', ' + result[i].name + ', ' + result[i].price);
        }
    }
      
     
    render() {
        const options = {}
        const employeeList = [{
            "employeeCode":"CGI-167",
            "employeeName":"Nitesh Gautam",
            "emailAddress":"nitesh.gautam@cygrp.com",
            "showUrl": <a href="https://talent-dashboard-app.herokuapp.com/userdetail?userId=1234&token=2dad">Url</a>
        }];
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
          }, {
            Header: "Action",
            headerClassName: 'my-favorites-column-header-group',
            accessor: "showUrl"
          }]
         
        return (
            <div>
                <BootstrapTable data={ employeeList } search={ true } options={ options } pagination striped hover condensed>
                    <TableHeaderColumn dataField='employeeCode' isKey searchable={ false }>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='employeeName'>Fruit Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='emailAddress'>Product Price</TableHeaderColumn>
                    <TableHeaderColumn dataField='showUrl'>Product Price</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
        document.getElementById('basic')
    }
}

export default Employee;