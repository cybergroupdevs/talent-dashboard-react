import React, { Component } from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2'

class Dashboard extends Component {
    
    state = {
        employeeList: [],
        chartData: {
                labels:[], 
                datasets:[]}
    };
    uniq(a) {
        return a.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        })
    }
    componentDidMount () {
        if(localStorage.getItem('user')){
            let randomColor = ['#0075c2','#8511DE','#DE116B','#DE8511','#1E11DE','#FF7F50','#CD853F','#A52A2A','#FF4500','#228B22','#BA55D3','#2F4F4F','#0075c2','#8511DE','#DE116B','#DE8511','#1E11DE','#FF7F50','#CD853F','#A52A2A','#FF4500','#228B22','#BA55D3','#2F4F4F','#0075c2','#8511DE','#DE116B','#DE8511','#1E11DE','#FF7F50','#CD853F','#A52A2A','#FF4500','#228B22','#BA55D3','#2F4F4F']
            axios.get('https://talent-dashboard-app.herokuapp.com/employeeList?pageNo=1&limit=100',{ headers: { token: localStorage.getItem('token') } }).then(response => {
                if(response.data['data'] && response.data['data'].length>0){
                    let employees = {labels:[], datasets:[]}
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
                    // employees['labels'] = employees['labels'].slice(0,6)
                    employees['datasets'].push({"lable": "Data", data:[], backgroundColor:[]})
                    var i = 0
                    employees['labels'].forEach((lab) => {
                        employees['datasets'][0]['backgroundColor'].push(randomColor[i])
                        employees['datasets'][0]['data'].push(counts[lab])
                        i = i+1
                    })
                    this.setState({chartData: employees})
                }
                else{
                    let employees = {labels:[], datasets:[]}
                    this.setState({chartData: employees})
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
            <div style={{marginRight: "140px",marginLeft: "140px",paddingTop:"20px",paddingBottom:"50px"}}>
            <div className="chart">
                <Bar 
                    data={this.state.chartData}
                    options={{
                        title:{
                            display: true,
                            text: 'Employees by Skills',
                            fontSize: 13,
                        },
                        legend:{
                            display: false,
                            position: 'right'
                        },
                        options:{
                            maintainAspectRatio: true
                        },
                        scales: {
                            yAxes: [{ticks: {beginAtZero:true}}]
                        }
                    }}
                />
            </div>
            </div>
        )
    }
}

export default Dashboard;