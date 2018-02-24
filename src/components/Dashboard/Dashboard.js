import React, { Component } from 'react';
import axios from 'axios';
import {Bar, Line, Pie} from 'react-chartjs-2'

class Dashboard extends Component {
    state = {
        employeeList: [],
        chartData: {
                labels:['a','b','c','d','e','f'], 
                datasets:[{lable: "abc", data:[34,45,64,33,23,23]}], 
                backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ]}
    };
    uniq(a) {
        return a.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        })
    }
    componentDidMount () {
        if(localStorage.getItem('user')){
            axios.get('https://talent-dashboard-app.herokuapp.com/employeeList?pageNo=1',{ headers: { token: localStorage.getItem('token') } }).then(response => {
                if(response.data['data'] && response.data['data'].length>0){
                    let employees = {labels:[], datasets:[],
                        fillColor: ['rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)' ],
                        strokeColor: "rgba(220,220,220,0.8)", 
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ]}
                    response.data['data'].forEach((emp) =>{
                        if(emp.skills && emp.skills.length>0){
                            emp.skills.forEach((skill)=>{
                                employees['labels'].push(skill)
                            })
                        }
                    })
                    var counts = {}
                    employees['labels'].forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
                    employees['labels'] = this.uniq(employees['labels'])
                    employees['labels'] = employees['labels'].slice(0,6)
                    employees['datasets'].push({"lable": "Data", data:[]})
                    employees['labels'].forEach((lab) => {
                        employees['datasets'][0]['data'].push(counts[lab])
                    })
                    this.setState({chartData: employees})
                }
                else{
                    let employees = {labels:[], datasets:[], backgroundColor:[
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                    ]}
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        else{
            this.props.history.push('/login')
        }
    }
    
    render() {
        return (
            <div style={{marginRight: "40px",marginLeft: "40px",paddingTop:"20px",paddingBottom:"50px"}}>
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    options={{
                        title:{
                            display: true,
                            text: 'No. Of Employee by Skills',
                            fontSize: 10,
                        },
                        legend:{
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
            </div>
        )
    }
}

export default Dashboard;