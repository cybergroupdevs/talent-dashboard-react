import React from 'react';
import '../../css/morris.css'
const header = (props) => {
    if(props.currentUser){
        return (
            
            <div id="wrapper">
            
            <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{"margin-bottom": 0}}>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="index.html">Cyber Group</a>
                </div>

                <div className="navbar-default sidebar pull-left" role="navigation" style={{"min-height": 550}}>
                    <div className="sidebar-nav navbar-collapse collapse">
                        <ul className="nav in " id="side-menu">
                            <li className="sidebar-search">
                                <div className="input-group custom-search-form">
                                    <input type="text" className="form-control" placeholder="Search..."/>
                                    <span className="input-group-btn">
                                    <button className="btn btn-default" type="button">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </span>
                                </div>
                            </li>
                            
                            <li>
                                <a href="/" className="active"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
                            </li>
                            <li>
                                <a href="/userdetail"><i className="fa fa-user fa-fw"></i> My Profile</a>
                            </li>
                            <li>
                                <a href="/employee_list"><i className="fa fa-table fa-fw"></i> Employee List</a>
                            </li>
                            <li>
                                <a href="/edit"><i className="fa fa-edit fa-fw"></i> Forms</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" onClick={props.clickOnLogout}><i className="fa fa-user fa-fw"></i> Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            </div>
        )
    }
    else{
        return (<div></div>)
    }
};
export default header;