import React, { Component } from 'react';
import axios from 'axios';
class EmployeeForm extends Component {
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
 
    render() {
        return (
            <div>Employee Form</div>
        )
    }
}

export default EmployeeForm;